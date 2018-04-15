defmodule Exred.Node.DebugTest do
  use ExUnit.Case
  doctest Exred.Node.Debug

  test "greets the world" do
    assert Exred.Node.Debug.hello() == :world
  end
end
