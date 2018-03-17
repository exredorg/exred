defmodule Exred.Umbrella.Mixfile do
  use Mix.Project

  def project do
    [
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
        {:exred_node_trigger,                 git: "git@bitbucket.org:zsolt001/exred_node_trigger"},
        {:exred_node_debug,                   git: "git@bitbucket.org:zsolt001/exred_node_debug"},
        {:exred_node_multiply,                git: "git@bitbucket.org:zsolt001/exred_node_multiply"},
        {:exred_node_redis_daemon,            git: "git@bitbucket.org:zsolt001/exred_node_redis_daemon"},
        {:exred_node_aws_iot_daemon,          git: "git@bitbucket.org:zsolt001/exred_node_aws_iot_daemon"},
        {:exred_node_redis_in,                git: "git@bitbucket.org:zsolt001/exred_node_redis_in"},
        {:exred_node_redis_out,               git: "git@bitbucket.org:zsolt001/exred_node_redis_out"},
        {:exred_node_aws_iot_thingshadow_in,  git: "git@bitbucket.org:zsolt001/exred_node_aws_iot_thingshadow_in"},
      
        {:wobserver, "~> 0.1"},
        {:uuid, "~> 1.1" },
      ]
  end
end
