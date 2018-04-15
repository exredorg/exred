defmodule Exred.Node.Trigger do
  @moduledoc """
  Exred node prototype to trigger other nodes.
  It simply sends a message at regular intervals.
  
  If the interval is set to 0 it'll only send if it is manually triggered 
  from the UI.
  
  Inputs
  ------
  none
  
  Outputs
  -------
  __payload__: the configured payload of the message

  Configuration
  -------------
  __interval__: interval between two messages (in milliseconds)
  
  __payload__: the message payload to be sent
  """

  @name "Trigger"
  @category "output"
  @info @moduledoc
  @config %{
    name: %{value: @name, type: "string", attrs: %{max: 15} },
    interval: %{value: 0, type: "number", attrs: %{min: 0, max: 3600}},
    payload: %{value: "timeout", type: "string", attrs: %{max: 20}}
  }
  @ui_attributes %{fire_button: true, right_icon: "send"}

  use Exred.Library.NodePrototype

  @impl true
  def node_init(state) do
    msg = %{payload: state.config.payload.value}
    if state.config.interval.value > 0, do: Process.send_after self(), msg, state.config.interval.value
    Map.put(state, :msg, msg)
  end
  

  @impl true
  def fire(state) do
    # Enum.each state.out_nodes, & send(&1, state.config.payload.value)
    Enum.each state.out_nodes, & send(&1, state.msg)
    state
  end
  

  @impl true
  def handle_msg(msg, state) do
    if state.config.interval.value > 0, do: Process.send_after self(), msg, state.config.interval.value
    {msg, state}
  end
end
