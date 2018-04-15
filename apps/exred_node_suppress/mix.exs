defmodule Exred.Node.Suppress.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exred_node_suppress,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.5",
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:exred_library, git: "git@bitbucket.org:zsolt001/exred_library.git"}
    ]
  end
end
