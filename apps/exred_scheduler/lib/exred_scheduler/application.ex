defmodule Exred.Scheduler.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      Exred.Scheduler.PhxSocketClient,
      Exred.Scheduler.DeployManager,
      Exred.Scheduler.DeploymentSupervisor,
      Exred.Scheduler.DaemonNodeSupervisor

      # Exred.Scheduler.CmdChannelClient,
      # Exred.Scheduler.EventChannelClient,

      # Starts a worker by calling: Exred.Scheduler.Worker.start_link(arg)
      # {Exred.Scheduler.Worker, arg},
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Exred.Scheduler.Supervisor]
    start_res = Supervisor.start_link(children, opts)

    # register topic handlers with PhxSocketClient
    :timer.sleep(2000)
    Exred.Scheduler.EventChannel.register()
    Exred.Scheduler.CommandChannel.register()

    start_res
  end
end
