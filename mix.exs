defmodule Exred.Umbrella.Mixfile do
  use Mix.Project

  def project do
    [
      version: "0.1.4",
      apps_path: "apps",
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  
  # Dependencies listed here are available only for this
  # project and cannot be accessed from applications inside
  # the apps folder.
  #
  # Run "mix help deps" for examples and options.
  defp deps do
      [
        {:distillery, "~> 1.5", runtime: false},
        {:conform, "~> 2.2"}
      ]
  end

end
