use Mix.Config

# ssl options for the MQTT client
# these get passed to the Erlang ssl module
# see ssl_option() here: http://erlang.org/doc/man/ssl.html
config :exred_node_aws_iot_daemon, :ssl,
  keyfile: "/Users/zkeszthelyi/src/exred/certs/ff925dd2f1-private.pem.key",
  certfile: "/Users/zkeszthelyi/src/exred/certs/ff925dd2f1-certificate.pem.crt",
  cacertfile: "/Users/zkeszthelyi/src/exred/certs/symantec_ca_root.pem"

# import_config "#{Mix.env}.exs"
