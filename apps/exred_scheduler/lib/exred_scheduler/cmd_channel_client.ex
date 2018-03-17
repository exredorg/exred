defmodule Exred.Scheduler.CmdChannelClient do
  @moduledoc """
  Handles communications with the cmd phoenix channel
  """

  @cmd_topic "cmd:general"

  require Logger
  use GenServer
  
  
  # API
  
  def start_link(_args) do
    GenServer.start_link(__MODULE__, _args, name: __MODULE__)
  end
  
  def broadcast(event, msg) do
    GenServer.cast(__MODULE__, {:broadcast, event, msg})
  end

  
  # Callbacks
  def init(_args) do
    {:ok, :initializing, 2000}
  end 


  def handle_info(:timeout, :initializing) do
    state = case ExredWeb.Endpoint.subscribe( @cmd_topic ) do
      :ok -> :subscribed
      {:error, err} ->
        Logger.error "Failed to subscribe to #{@cmd_topic}: #{inspect err}"
        :failed
    end 
    {:noreply, state}
  end

  def handle_info(%Phoenix.Socket.Broadcast{event: "request"} = msg, state = :subscribed) do
    case msg.payload do
      %{"action" => "deploy"} -> 
        Exred.Scheduler.DeployManager.deploy
      %{"action" => "fire", "node_id" => node_id_str} ->
        node_id = String.to_existing_atom(node_id_str)
        GenServer.call(node_id, :fire)
      other -> 
        Logger.warn "unhadled request: #{inspect msg}"
    end
    {:noreply, state}
  end
  
  def handle_info(%Phoenix.Socket.Broadcast{} = msg, state = :subscribed) do
    # Logger.warn "unhandled message: #{inspect msg}"
    {:noreply, state}
  end


  def handle_cast({:broadcast, event, msg}, state = :subscribed) do
    ExredWeb.Endpoint.broadcast @cmd_topic, event, msg
    {:noreply, state}
  end
end