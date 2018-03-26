# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

# By default, the umbrella project as well as each child
# application will require this configuration file, ensuring
# they all use the same configuration. While one could
# configure all applications here, we prefer to delegate
# back to each application for organization purposes.
import_config "../apps/*/config/config.exs"


config :logger, :console,
  level: :debug,
  format: "$date $time | [$level]$levelpad | $metadata | $message\n",
  metadata: [:module]


# ssl options for the MQTT client
# these get passed to the Erlang ssl module
# see ssl_option() here: http://erlang.org/doc/man/ssl.html
config :exred_node_aws_iot_daemon, :ssl,
  keyfile: "/Users/zkeszthelyi/src/exred_repos/exred/certs/c592a5868f-private.pem.key",
  certfile: "/Users/zkeszthelyi/src/exred_repos/exred/certs/c592a5868f-certificate.pem.crt",
  cacertfile: "/Users/zkeszthelyi/src/exred_repos/exred/certs/symantec_ca_root.pem"
