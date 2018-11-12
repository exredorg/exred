defmodule Exred.Scheduler.PhxSocketClient do
  @moduledoc false
  require Logger
  alias Phoenix.Channels.GenSocketClient
  @behaviour GenSocketClient

  ######################################
  # API
  ######################################

  def start_link(_args) do
    GenSocketClient.start_link(
      __MODULE__,
      Phoenix.Channels.GenSocketClient.Transport.WebSocketClient,
      "ws://localhost:4000/socket/websocket",
      [],
      name: __MODULE__
    )
  end

  def child_spec(opts) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [opts]},
      type: :worker,
      restart: :permanent,
      shutdown: 500
    }
  end

  @doc """
  Register a handler for a topic.
  This includes joining a topic and registering the module to handle
  incoming messages for that topic.
  """
  def register(topic, handler_mod) do
    send(__MODULE__, {:register, topic, handler_mod})
  end

  def unregister(topic) do
    send(__MODULE__, {:unregister, topic})
  end

  def send(topic, event, payload) do
    send(__MODULE__, {:send, topic, event, payload})
  end

  def get_state do
    Phoenix.Channels.GenSocketClient.call(__MODULE__, :get_state)
  end

  ######################################
  # Callbacks
  ######################################

  defp initial_state, do: %{handlers: %{}}

  def init(url) do
    {:connect, url, [], initial_state()}
  end

  def handle_connected(_transport, state) do
    Logger.info("connected")
    # register all existing handlers (either after initial connect or after reconnect)
    state.handlers |> Enum.each(&register(elem(&1, 0), elem(&1, 1)))

    {:ok, state}
  end

  def handle_disconnected(reason, state) do
    Logger.error("disconnected: #{inspect(reason)}")
    # try to reconnect
    Process.send_after(self(), :connect, :timer.seconds(1))
    {:ok, state}
  end

  def handle_joined(topic, _payload, _transport, state) do
    Logger.info("joined the topic #{topic}")
    {:ok, state}
  end

  def handle_join_error(topic, payload, _transport, state) do
    Logger.error("join error on the topic #{topic}: #{inspect(payload)}")
    {:ok, state}
  end

  def handle_channel_closed(topic, payload, _transport, state) do
    Logger.error("disconnected from the topic #{topic}: #{inspect(payload)}")
    handler_mod = Map.get(state.handlers, topic)
    Process.send_after(self(), {:register, topic, handler_mod}, :timer.seconds(1))
    {:ok, state}
  end

  def handle_message(topic, event, payload, _transport, state) do
    Logger.debug("message on topic #{topic}: #{event} #{inspect(payload)}")

    case Map.fetch(state.handlers, topic) do
      {:ok, handler} ->
        handler.handle_message(event, payload)

      {:error} ->
        Logger.warn("missing handler for message received on topic: #{topic}")
    end

    {:ok, state}
  end

  def handle_reply(topic, _ref, payload, _transport, state) do
    Logger.warn("reply on topic #{topic}: #{inspect(payload)}")
    {:ok, state}
  end

  def handle_info(:connect, _transport, state) do
    Logger.info("connecting")
    {:connect, state}
  end

  def handle_info({:send, topic, event, payload}, transport, state) do
    # push can actually fail but since this is a handle_info there's no way to return a response
    # could be converted to a handle call to not fail silently
    # but since there's no guarantee that a sent message arrives if that's a concern the caller needs
    # to set up a protocol to get confirmation of message arrival
    case GenSocketClient.push(transport, topic, event, payload) do
      {:ok, _ref} ->
        :ok

      {:error, reason} ->
        Logger.error("message send failed on topic: #{topic} with reason: #{inspect(reason)}")
    end

    {:ok, state}
  end

  def handle_info({:register, topic, handler_mod}, transport, state) do
    Logger.info("joining the topic #{topic}")

    case GenSocketClient.join(transport, topic) do
      {:error, reason} ->
        Logger.error("error joining the topic #{topic}: #{inspect(reason)}")
        Process.send_after(self(), {:register, topic, handler_mod}, :timer.seconds(1))
        {:ok, state}

      {:ok, _ref} ->
        handlers = Map.put(state.handlers, topic, handler_mod)
        {:ok, %{state | handlers: handlers}}
    end
  end

  def handle_info({:unregister, topic}, transport, state) do
    Logger.info("leaving the topic #{topic}")

    case GenSocketClient.leave(transport, topic) do
      {:error, reason} ->
        Logger.error("error leaving the topic #{topic}: #{inspect(reason)}")
        Process.send_after(self(), {:unregister, topic}, :timer.seconds(1))
        {:ok, state}

      {:ok, _ref} ->
        handlers = Map.drop(state.handlers, [topic])
        {:ok, %{state | handlers: handlers}}
    end
  end

  def handle_info(message, _transport, state) do
    Logger.warn("Unhandled message #{inspect(message)}")
    {:ok, state}
  end

  def handle_call(:get_state, _from, _transport, state) do
    {:reply, state, state}
  end

  def handle_call(_msg, _from, _transport, state) do
    {:noreply, state}
  end
end
