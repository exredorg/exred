defmodule Exred.Umbrella.Mixfile do
  use Mix.Project

  def project do
    [
      version: "0.1.5",
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
  
  
  defp package do
    %{
      licenses: ["MIT"],
      maintainers: ["Zsolt Keszthelyi"],
      links: %{
        "GitHub" => "https://github.com/exredorg/exred",
        "Exred" => "http://exred.org"
      },
      files: ["lib", "mix.exs", "README.md", "LICENSE"]
    }
  end
end
