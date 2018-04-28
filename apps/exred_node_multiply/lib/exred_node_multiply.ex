defmodule Exred.Node.Multiply do
  @moduledoc """
  Documentation for Exred.Node.Multiply.
  """
  
  @name "Multiply"
  @category "function"
  @info """
  Multiplies input
  """
  @config %{
    name: %{value: @name, type: "string"},
    code: %{value: "fn(msg, state)->\n\n\t{msg, state}\nend\n", type: "codeblock"},
    multiplier: %{value: 2, type: "number", attrs: %{min: 1, max: 12}}
  }
  @ui_attributes %{right_icon: "build" }
  
  use Exred.Library.NodePrototype
  require Logger
  
  @impl true
  def handle_msg(msg, state) do
    {handler, _} = Code.eval_string(state.config.code.value)
    {newmsg, newstate} = handler.(msg, state)
    Logger.info("SENDING: #{inspect newmsg}")
    {newmsg, newstate}
  end

  
end
