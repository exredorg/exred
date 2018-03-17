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
      {:exred_node_trigger,                 path: "../../node_library/exred_node_trigger"},
      {:exred_node_debug,                   path: "../../node_library/exred_node_debug"},
      {:exred_node_multiply,                path: "../../node_library/exred_node_multiply"},
      {:exred_node_redis_daemon,            path: "../../node_library/exred_node_redis_daemon"},
      {:exred_node_aws_iot_daemon,          path: "../../node_library/exred_node_aws_iot_daemon"},
      {:exred_node_redis_in,                path: "../../node_library/exred_node_redis_in"},
      {:exred_node_redis_out,               path: "../../node_library/exred_node_redis_out"},
      {:exred_node_aws_iot_thingshadow_in,  path: "../../node_library/exred_node_aws_iot_thingshadow_in"},
      
      {:wobserver, "~> 0.1"}
      # {:exred_library, in_umbrella: true, app: false}
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
      # {:sibling_app_in_umbrella, in_umbrella: true},
    ]
  end
end
