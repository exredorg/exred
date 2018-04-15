defmodule Exred.Node.RedisDaemon do
  @moduledoc """
  This is a **deamon node**. It does not handle messages like a regular node.
  It is used for configuring and starting up a Redis connection pool that other 
  nodes can use.
  (currently it uses Redix)
  """

  alias Exred.Scheduler.DaemonNodeSupervisor

  @name "Redis Daemon"
  @category "daemon"
  @info @moduledoc
  @config %{
    host: %{type: "string", value: "localhost"},
    port: %{type: "number", value: 6379, attrs: %{min: 0, max: 65535}},
    database: %{type: "number", value: 0},
    password: %{type: "string", value: nil},
    connection_name: %{type: "string", value: "redis"}
  }
  @ui_attributes %{right_icon: "loop" }
  
  
  use Exred.Library.NodePrototype
  require Logger
  
  @impl true
  def node_init(state) do
    redis_opts = [
      host: state.config.host.value,
      port: state.config.port.value,
      database: state.config.database.value,
      password: state.config.password.value
    ]
    conn_opts = [name: String.to_atom( state.config.connection_name.value)]    # name cannot be a string 
    
    redix_child_spec = Supervisor.child_spec {Redix, [redis_opts, conn_opts]}, []
    
    case DaemonNodeSupervisor.start_child(redix_child_spec) do
      {:ok, _pid} -> :ok
      {:error, {:already_started, _pid}} -> :ok
      {:error, other} ->
        event = "notification"
        debug_data = %{msg: "Could not initialize " <> @name}
        event_msg = %{node_id: state.node_id, node_name: @name, debug_data: debug_data}
        EventChannelClient.broadcast event, event_msg
    end
    state
  end
end
