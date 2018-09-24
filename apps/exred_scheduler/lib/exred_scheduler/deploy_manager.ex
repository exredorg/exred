defmodule Exred.Scheduler.DeployManager do
  @moduledoc """
  Manages the deployment of flows
  """
  
  require Logger
  
  alias Exred.Library
  alias Exred.Library.Node
  alias Exred.Library.Connection
  alias Exred.Scheduler.DeploymentSupervisor
  alias Exred.Scheduler.CmdChannelClient
  
  
  use GenServer
  
  # API
  
  def start_link(_args) do
    GenServer.start_link(__MODULE__, _args, name: __MODULE__)
  end
  
  def deploy do
    GenServer.call(__MODULE__, :deploy, 30000)
  end
  
  # Callbacks
  def init(_args) do
    {:ok, %{}}
  end
  
  def handle_call(:deploy, _from, state) do
    Logger.info "Starting deployment"
    
    # terminate all running processes
    ########################################
    children = Supervisor.which_children DeploymentSupervisor
    children |> Enum.each( fn
      ({child_id, :restarting, _, child_modules}) ->
        Logger.warn "Couldn't terminate #{child_id} (in the process of restarting). Module: #{inspect child_modules}"
      ({child_id, _child_pid, _child_type, _child_modules}) ->
        :ok = Supervisor.terminate_child DeploymentSupervisor, child_id
        :ok = Supervisor.delete_child DeploymentSupervisor, child_id
      end
    )
    Logger.info "terminated child processes"
            
    # get nodes from library and start instances
    #############################################
    nodes = Library.get_all_nodes
    
    ## sort nodes; put daemon nodes first
    sorted_nodes = nodes
    |> Enum.sort fn(n1, _n2) -> n1.category == "daemon" end
    
    ## start node instances
    sorted_nodes |> Enum.each fn( %Node{} = node ) ->
      Logger.info "STARTING NODE INSTANCE: #{node.name}"
      start_args = [node.id, node.config]
      child_spec = Supervisor.child_spec {node.module, start_args}, id: node.id

      # TODO: what are we going to do when a child doesn't start up?
      # ignore and deploy rest of flow OR abort and report failed deployment
      {:ok, pid} = Supervisor.start_child DeploymentSupervisor, child_spec
    end
    Logger.info "started child processes"
    
    # get connections from library and set them up on the nodes
    ############################################################
    connections = Library.get_all_connections
    Enum.each connections, fn(%Connection{} = conn) ->
      # can't call the node module's API to add a new connection because
      # we don't know what module it is
      # so we just call directly with GenServer
      GenServer.call conn.source_id, {:add_out_node, conn.target_id}
      Logger.info "ADDED CONNECTION: #{conn.source_id} -> #{conn.target_id}"
    end
    Logger.info "Set up connections"
    CmdChannelClient.broadcast("notification", %{msg: "Deployed Flows"})
    
    {:reply, :ok, state}
  end
end
