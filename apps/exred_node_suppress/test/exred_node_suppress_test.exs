defmodule Exred.Node.SuppressTest do
  use ExUnit.Case
  doctest Exred.Node.Suppress

  def config_suppress_all, do: %{what: %{value: :all}}
  def msg,   do: %{payload: 42}
  def state, do: %{timer_ref: nil}
  def suppress_state, do: %{timer_ref: :forever, config: config_suppress_all}
  
  test "handles messages" do
    assert {%{}, %{}} = Exred.Node.Suppress.handle_msg(msg, state)
  end
  
  test "returns attributes" do
    assert is_map( Exred.Node.Suppress.attributes )
  end
  
  test "suppresses forever / all" do
    assert {nil, _} = Exred.Node.Suppress.handle_msg(msg, suppress_state)
  end

end
