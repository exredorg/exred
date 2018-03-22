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
    mixfile = Mix.Project.get()
    include_nodes = Keyword.fetch!(mixfile.project, :include_nodes)
    [
      {:exred_library, git: "git@bitbucket.org:zsolt001/exred_library.git"},
      {:wobserver, "~> 0.1"}
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
      # {:sibling_app_in_umbrella, in_umbrella: true},
    ] ++ include_nodes
  end
end
