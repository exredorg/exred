defmodule Exred.Scheduler.EventChannel do
  @moduledoc """
  Helper functions to communicate on the event channel.
  """

  alias Exred.Scheduler.PhxSocketClient
  require Logger

  @topic "event:debug"

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
  def handle_message(event, payload) do
    Logger.info("unhandled event #{inspect(event)}, payload: #{inspect(payload)}")
  end
end
