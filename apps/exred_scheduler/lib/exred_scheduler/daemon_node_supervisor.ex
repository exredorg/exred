defmodule Exred.Scheduler.DaemonNodeSupervisor do
  use Supervisor

  def start_link(arg) do
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)
  end

  def init(_arg) do
    Supervisor.init([], strategy: :one_for_one)
  end
  
  def start_child(child_spec) do
    Supervisor.start_child __MODULE__, child_spec
  end
end