defmodule Exred.Node.RedisInTest do
  use ExUnit.Case
  doctest Exred.Node.RedisIn

  test "greets the world" do
    assert Exred.Node.RedisIn.hello() == :world
  end
end
