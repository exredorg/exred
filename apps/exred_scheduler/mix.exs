defmodule Exred.Scheduler.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exred_scheduler,
      version: "0.1.1",
      build_path: "./_build",
      config_path: "./config/config.exs",
      deps_path: "./deps",
      lockfile: "./mix.lock",
      elixir: "~> 1.7",
      start_permanent: Mix.env() == :prod,
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
      {:exred_library, "~> 0.1.11"},
      {:phoenix_gen_socket_client, "~> 2.1.1"},
      {:websocket_client, "~> 1.2"},
      {:poison, "~> 2.0"},
      {:ex_doc, "~> 0.19.0", only: :dev, runtime: false},
      {:distillery, "~> 1.5", runtime: false},
      {:conform, "~> 2.2"}
      # {:wobserver, "~> 0.1"}
    ] ++ nodes()
  end

  defp nodes do
    [
      {:exred_node_aws_iot_daemon, "~> 0.1.0"},
      {:exred_node_aws_iot_thingshadow_in, "~> 0.1.0"},
      {:exred_node_aws_iot_thingshadow_out, "~> 0.1.0"},
      {:exred_node_debug, "~> 0.1.0"},
      {:exred_node_gpio_in, "~> 0.1.0"},
      {:exred_node_gpio_out, "~> 0.1.0"},
      {:exred_node_redis_daemon, "~> 0.1.0"},
      {:exred_node_redis_in, "~> 0.1.0"},
      {:exred_node_redis_out, "~> 0.1.0"},
      {:exred_node_suppress, "~> 0.1.0"},
      {:exred_node_trigger, "~> 0.1.0"},
      {:exred_node_rpiphoto, "~> 0.1.0"},
      {:exred_node_shell, "~> 0.1.0"},
      {:exred_node_picar, "~> 0.1.0"},
      {:exred_node_function, "~> 0.1.0"},
      {:exred_node_grpc_server, path: "../../../exred_node_grpc_server"},
      {:exred_node_grpc_twin, path: "../../../exred_node_grpc_twin"}
    ]
  end
end
