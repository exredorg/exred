defmodule Exred.Node.AwsIotThingShadowIn do
  @moduledoc """
  Subcribes to topics related to a thing shadow in the aws iot cloud.
  
  By default all topics are subscribed for but this can be changed by
  unchecking checkmarks next to the unwanted topics in the config tab.
  
  Available topics:
  - /update/accepted
  - /update/rejected
  - /update/document
  - /update/delta
  - /get/accepted
  - /get/rejected
  - /delete/accepted
  - /delete/rejected
  """

  @name "AWS Thing Shadow In"
  @category "input"
  @info @moduledoc
  @aws_input_topics [
    "/update/accepted",
    "/update/rejected",
    "/update/documents",
    "/update/delta",
    "/get/accepted",
    "/get/rejected",
    "/delete/accepted",
    "/delete/rejected"
  ]
  @config %{
    thing_name: %{type: "string", value: "myThing"},
    topics: %{type: "list-multiselect", value: [], attrs: %{items: @aws_input_topics}},
    name: %{value: @name, type: "string", attrs: %{max: 20}}
  }
  @ui_attributes %{fire_button: false, left_icon: "send" }
  
  use Exred.Library.NodePrototype
  require Logger

  @impl true
  def node_init(state) do
    topics_prefix = "$aws/things/" <> state.config.thing_name.value <> "/shadow"
    state.config.topics.value
    |> Enum.map(& topics_prefix<>&1)
    |> AwsIotClient.subscribe
    state
  end

  @impl true
  def handle_msg(msg, state) do
    Logger.debug "received: #{inspect msg}"
    {msg, state}
  end


end
