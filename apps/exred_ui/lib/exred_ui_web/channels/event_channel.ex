defmodule ExredUIWeb.EventChannel do
  use ExredUIWeb, :channel

  require Logger


  def join("event:debug", payload, socket) do
    if authorized?(payload) do
      # Logger.info "Joined: #{inspect socket}\npayload: #{inspect payload}"
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end
    
  def join("event:" <> _private_topic_id, _params, _socket) do
      {:error, %{reason: "unauthorized"}}
  end


  def handle_in("request", payload, socket) do
    broadcast socket, "request", payload
    {:reply, :ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (event:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end


  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
