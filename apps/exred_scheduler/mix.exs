defmodule Exred.Scheduler.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exred_scheduler,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "./config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.5",
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {Exred.Scheduler.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:exred_library, git: "git@bitbucket.org:zsolt001/exred_library.git"},
      {:wobserver, "~> 0.1"}
    ] ++ nodes()
  end
  
  defp nodes do
    [
      {:exred_node_aws_iot_daemon,          git: "git@bitbucket.org:zsolt001/exred_node_aws_iot_daemon.git"},
      {:exred_node_aws_iot_thingshadow_in,  git: "git@bitbucket.org:zsolt001/exred_node_aws_iot_thingshadow_in.git"},
      {:exred_node_aws_iot_thingshadow_out, git: "git@bitbucket.org:zsolt001/exred_node_aws_iot_thingshadow_out.git"},
      {:exred_node_debug,                   git: "git@bitbucket.org:zsolt001/exred_node_debug.git"},
      {:exred_node_gpio_in,                 git: "git@bitbucket.org:zsolt001/exred_node_gpio_in.git"},
      {:exred_node_gpio_out,                git: "git@bitbucket.org:zsolt001/exred_node_gpio_out.git"},
      {:exred_node_multiply,                git: "git@bitbucket.org:zsolt001/exred_node_multiply.git"},
      {:exred_node_redis_daemon,            git: "git@bitbucket.org:zsolt001/exred_node_redis_daemon.git"},
      {:exred_node_redis_in,                git: "git@bitbucket.org:zsolt001/exred_node_redis_in.git"},
      {:exred_node_redis_out,               git: "git@bitbucket.org:zsolt001/exred_node_redis_out.git"},
      {:exred_node_suppress,                git: "git@bitbucket.org:zsolt001/exred_node_suppress.git"},
      {:exred_node_trigger,                 git: "git@bitbucket.org:zsolt001/exred_node_trigger.git"}
    ]
  end
end
