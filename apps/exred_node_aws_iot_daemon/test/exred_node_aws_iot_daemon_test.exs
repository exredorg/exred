defmodule Exred.Node.AwsIotDaemonTest do
  use ExUnit.Case
  doctest Exred.Node.AwsIotDaemon

  test "greets the world" do
    assert Exred.Node.AwsIotDaemon.hello() == :world
  end
end
