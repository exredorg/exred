defmodule AwsIotClient do
  @moduledoc """
  Client based on Gen MQTT
  """

  @options [
    name: __MODULE__,
    host: "a198unk2hf0hqn.iot.us-east-1.amazonaws.com", 
    port: 8883,
    client: "exred 1",
    transport: {:ssl, [
        keyfile: "/Users/zkeszthelyi/src/exred/certs/ff925dd2f1-private.pem.key",
        certfile: "/Users/zkeszthelyi/src/exred/certs/ff925dd2f1-certificate.pem.crt",
        cacertfile: "/Users/zkeszthelyi/src/exred/certs/symantec_ca_root.pem"]}
  ]

  @topics [
    "$aws/things/rpi/shadow/get/accepted",
    "$aws/things/rpi/shadow/get/rejected"
  ]


  use GenMQTT
  require Logger


  # API
  
  def start_link do
    state = %{ready: false, subscribe_queue: [], subscriptions: []}
    start_options = Keyword.put(@options, :name, __MODULE__)
    GenMQTT.start_link(__MODULE__, state, start_options)
  end

  def start_link(options) do
    state = %{ready: false, subscribe_queue: [], subscriptions: []}
    start_options = Keyword.put(options, :name, __MODULE__)
    GenMQTT.start_link(__MODULE__, state, start_options)
  end

  def get_state, do: GenMQTT.call(__MODULE__, :get_state)
  
  def subscribe(topic, qos \\ 0, retain \\ false)
  def subscribe(topic, qos, retain) when is_bitstring(topic), do: subscribe([topic], qos, retain)
  def subscribe(topics, qos, retain) when is_list(topics) do
    GenMQTT.call(__MODULE__, {:subscribe, topics, qos, retain})
  end

  def publish(topic \\ "$aws/things/rpi/shadow/get", payload \\ "", qos \\ 0, retain \\ false) do
    Logger.debug "PUBLISH to topic: #{inspect topic}"
    GenMQTT.publish(__MODULE__, topic, payload, qos, retain)
  end


  # Callbacks


  def process_subscribe_request(req, from) do
    {:subscribe, topics, qos, retain} = req
    {from_pid, _from_tag} = from
    
    topic_qos_tuples = Enum.map topics, & {&1, qos}
    :ok = GenMQTT.subscribe(self(), topic_qos_tuples)
    
    new_subscriptions = Enum.map topics, & {&1, from_pid}
  end


  def on_connect(%{subscribe_queue: subscribe_queue, subscriptions: subscriptions} = state) do
    Logger.info "CONNECTED subscribe_queue length: #{inspect length(subscribe_queue)}, subscriptions length: #{inspect length(subscriptions)}"
    
    new_subscriptions = Enum.reduce subscribe_queue, subscriptions, fn({req, from}, acc) ->
      new = process_subscribe_request(req, from)
      acc ++ new 
    end
    
    {:ok, %{state| subscribe_queue: [], subscriptions: new_subscriptions, ready: true}}
  end
  
  
  def on_subscribe(list, state) do
    list_str = list
    |> Enum.map(fn({topic, qos}) -> "  "<>topic end)
    |> Enum.join("\n")

    Logger.debug "SUBSCRIBED to:\n#{list_str}"
    {:ok, state}
  end


  def on_publish(topic, message, state) do
    Logger.debug "Received msg on topic: #{inspect topic}"
    
    # convert the topic from a list to a string
    topic_str = Enum.join topic, "/"
    # decode message, it comes as serialized json
    payload = Poison.decode! message

    # TODO: fix sequential message forwarding
    # there's probably a better way to do this as this is similar to what 
    # the deprecated GenEvent does
    Enum.each state.subscriptions, fn
      ({^topic_str, subscriber_pid}) -> 
        # received msg's topic matched one in subscriptions
        send subscriber_pid, %{topic: topic, topic_str: topic_str, payload: payload}
      (_) -> :skip
    end
    {:ok, state}
  end



  def handle_call(:get_state, _from, state) do
    {:reply, state, state}
  end


  # not connected to aws, save subscribe requests in a queue
  def handle_call({:subscribe, topics, qos, retain} = req, from, %{subscribe_queue: subscribe_queue, ready: false} = state) do
    new_queue = [{req, from} | subscribe_queue]
    {:reply, :queued, %{state| subscribe_queue: new_queue}}
  end

  # subscribe to the requested topics
  def handle_call({:subscribe, topics, qos, retain} = req, from, %{subscriptions: subscriptions, ready: true} = state) do
    # store subscriptions in state as {topic, subscriber_pid} tuples
    new_subscriptions = process_subscribe_request(req, from)
    new_state = %{state | subscriptions: subscriptions ++ new_subscriptions}

    {:reply, :ok, new_state}
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
    
end