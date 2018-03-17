defmodule Exred.Scheduler.DeploymentSupervisor do
  @moduledoc """
  Supervises all of the processes that are deployed as part of flows.
  """
  
  
  use Supervisor

  def start_link(arg) do
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)
  end

  def init(_arg) do
    Supervisor.init([], strategy: :one_for_one)
  end
end
