defmodule Exred.Node.GPIOOutTest do
  use ExUnit.Case
  doctest Exred.Node.GPIOOut

  test "has attributes" do
    assert is_map(Exred.Node.GPIOOut.attributes())
  end

end
