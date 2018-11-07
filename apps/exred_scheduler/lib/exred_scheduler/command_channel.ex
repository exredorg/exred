defmodule Exred.Scheduler.CommandChannel do
  @moduledoc """
  Helper functions to communicate on the event channel.
  """

  alias Exred.Scheduler.PhxSocketClient
  require Logger

  @topic "cmd:general"

  def register do
    PhxSocketClient.register(@topic, __MODULE__)
  end

  def unregister do
    PhxSocketClient.unregister(@topic)
  end

  def send(event, payload) do
    PhxSocketClient.send(@topic, event, payload)
  end

  @doc """
  This gets called when something comes in on the topic this module is signed up for.
  """
  def handle_message("request", %{"action" => "deploy"}) do
    Exred.Scheduler.DeployManager.deploy()
  end

  def handle_message("request", %{"action" => "fire", "node_id" => node_id_str}) do
    node_id = String.to_existing_atom(node_id_str)
    GenServer.call(node_id, :fire)
  end

  def handle_message("request", payload) do
    Logger.warn("unhadled request: #{inspect(payload)}")
  end

  def handle_message(event, payload) do
    Logger.info("unhandled event #{inspect(event)}, payload: #{inspect(payload)}")
  end
end
