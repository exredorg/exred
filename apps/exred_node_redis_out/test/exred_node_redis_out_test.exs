defmodule Exred.Node.RedisOutTest do
  use ExUnit.Case
  doctest Exred.Node.RedisOut

  test "greets the world" do
    assert Exred.Node.RedisOut.hello() == :world
  end
end
