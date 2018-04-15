defmodule Exred.Node.AwsIotThingShadowOut do
  @moduledoc """
  Publishes messages to AWS IoT Cloud.
  
  The incoming message needs to have a valid AWS topic in the topic field.
  
  Incoming msg format:
  
  ```elixir
  msg = %{
    topic   :: [binary] | binary
    payload :: map,
    qos     :: integer,      # quality of service
    retain  :: boolean       # [GenMQTT doc](https://hexdocs.pm/gen_mqtt/GenMQTT.html#publish/5)
  }
  ```
  """
  @name "AWS Thing Shadow Out"
  @category "output"
  @info @moduledoc
  @config %{
    thing_name: %{type: "string", value: "myThing"},
    name: %{value: @name, type: "string", attrs: %{max: 20}}
  }
  @ui_attributes %{fire_button: false, right_icon: "send" }
  
  use Exred.Library.NodePrototype
  require Logger

  
  @impl true
  def handle_msg(msg, state) do
    encoded_payload = Poison.encode! msg.payload
    res = AwsIotClient.publish msg.topic, encoded_payload, Map.get(msg, :qos, 0), Map.get(msg, :retain, false)
    { %{msg | payload: res}, state }
  end

end
