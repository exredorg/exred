defmodule Exred.Node.RedisDaemonTest do
  use ExUnit.Case
  doctest Exred.Node.RedisDaemon

  test "greets the world" do
    assert Exred.Node.RedisDaemon.hello() == :world
  end
end
