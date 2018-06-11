[
  extends: [],
  import: [],
  mappings: [
    "exred_ui.Elixir.ExredUIWeb.Endpoint.http.port": [
      commented: false,
      datatype: :integer,
      default: 4000,
      doc: "UI port",
      hidden: false,
      env_var: "EXRED_UI_PORT",
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.http.port"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.url.host": [
      commented: false,
      datatype: :binary,
      default: "localhost",
      doc: "UI hostname",
      hidden: false,
      env_var: "EXRED_UI_HOSTNAME",
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.url.host"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.url.port": [
      commented: false,
      datatype: :integer,
      default: 4000,
      doc: "UI port",
      hidden: false,
      env_var: "EXRED_UI_PORT",
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.url.port"
    ],
    "exred_ui.Elixir.ExredUI.Repo.username": [
      commented: false,
      datatype: :binary,
      default: "zkeszthelyi",
      doc: "DB username",
      hidden: false,
      env_var: "EXRED_DB_USERNAME",
      to: "exred_ui.Elixir.ExredUI.Repo.username"
    ],
    "exred_ui.Elixir.ExredUI.Repo.password": [
      commented: false,
      datatype: :binary,
      default: "hello",
      doc: "DB password",
      hidden: false,
      env_var: "EXRED_DB_PASSWORD",
      to: "exred_ui.Elixir.ExredUI.Repo.password"
    ],
    "exred_ui.Elixir.ExredUI.Repo.database": [
      commented: false,
      datatype: :binary,
      default: "exred_ui_dev",
      doc: "DB name",
      hidden: false,
      env_var: "EXRED_DB_NAME",
      to: "exred_ui.Elixir.ExredUI.Repo.database"
    ],
    "exred_ui.Elixir.ExredUI.Repo.hostname": [
      commented: false,
      datatype: :binary,
      default: "localhost",
      doc: "DB server hostname",
      hidden: false,
      env_var: "EXRED_DB_HOSTNAME",
      to: "exred_ui.Elixir.ExredUI.Repo.hostname"
    ],
    "exred_ui.Elixir.ExredUI.Repo.port": [
      commented: false,
      datatype: :integer,
      default: 5432,
      doc: "DB server port",
      hidden: false,
      env_var: "EXRED_DB_PORT",
      to: "exred_ui.Elixir.ExredUI.Repo.port"
    ],




    "exred_ui.Elixir.ExredUI.Repo.pool_size": [
      commented: false,
      datatype: :integer,
      default: 10,
      doc: "Provide documentation for exred_ui.Elixir.ExredUI.Repo.pool_size here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUI.Repo.pool_size"
    ],
    "mime.types": [
      commented: false,
      datatype: :binary,
      doc: "Provide documentation for mime.types here.",
      hidden: true,
      to: "mime.types"
    ],
    "guardian.Elixir.Guardian.allowed_algos": [
      commented: false,
      datatype: [
        list: :binary
      ],
      default: [
        "HS512"
      ],
      doc: "Provide documentation for guardian.Elixir.Guardian.allowed_algos here.",
      hidden: true,
      to: "guardian.Elixir.Guardian.allowed_algos"
    ],
    "guardian.Elixir.Guardian.verify_module": [
      commented: false,
      datatype: :atom,
      default: Guardian.JWT,
      doc: "Provide documentation for guardian.Elixir.Guardian.verify_module here.",
      hidden: true,
      to: "guardian.Elixir.Guardian.verify_module"
    ],
    "guardian.Elixir.Guardian.issuer": [
      commented: false,
      datatype: :binary,
      default: "Pchat",
      doc: "Provide documentation for guardian.Elixir.Guardian.issuer here.",
      hidden: true,
      to: "guardian.Elixir.Guardian.issuer"
    ],
    "guardian.Elixir.Guardian.ttl": [
      commented: false,
      #datatype: {:integer, :atom},
      datatype: [
        list: :binary
      ],
      default: ['30', 'days'],
      doc: "Provide documentation for guardian.Elixir.Guardian.ttl here.",
      hidden: true,
      to: "guardian.Elixir.Guardian.ttl"
    ],
    "guardian.Elixir.Guardian.verify_issuer": [
      commented: false,
      datatype: :atom,
      default: true,
      doc: "Provide documentation for guardian.Elixir.Guardian.verify_issuer here.",
      hidden: true,
      to: "guardian.Elixir.Guardian.verify_issuer"
    ],
    "guardian.Elixir.Guardian.secret_key": [
      commented: false,
      datatype: :binary,
      default: "VR8YBJA94hYgn5KSxAHhr6RtBNJI2ZIdt11Cl3WlaxNtC+lX3hPTVSbFOBDKPEGF",
      doc: "Provide documentation for guardian.Elixir.Guardian.secret_key here.",
      hidden: true,
      to: "guardian.Elixir.Guardian.secret_key"
    ],
    "guardian.Elixir.Guardian.serializer": [
      commented: false,
      datatype: :atom,
      default: Pchat.GuardianSerializer,
      doc: "Provide documentation for guardian.Elixir.Guardian.serializer here.",
      hidden: true,
      to: "guardian.Elixir.Guardian.serializer"
    ],
    "logger.console.metadata": [
      commented: false,
      datatype: [
        list: :atom
      ],
      default: [
        :request_id
      ],
      doc: "Provide documentation for logger.console.metadata here.",
      hidden: true,
      to: "logger.console.metadata"
    ],
    "logger.console.format": [
      commented: false,
      datatype: :binary,
      default: """
      [$level] $message
      """,
      doc: "Provide documentation for logger.console.format here.",
      hidden: true,
      to: "logger.console.format"
    ],
    "logger.console.level": [
      commented: false,
      datatype: :atom,
      default: :debug,
      doc: "Console log level.",
      hidden: false,
      to: "logger.console.level"
    ],
    "phoenix.format_encoders.json-api": [
      commented: false,
      datatype: :atom,
      default: Poison,
      doc: "Provide documentation for phoenix.format_encoders.json-api here.",
      hidden: true,
      to: "phoenix.format_encoders.json-api"
    ],
    "phoenix.stacktrace_depth": [
      commented: false,
      datatype: :integer,
      default: 20,
      doc: "Provide documentation for phoenix.stacktrace_depth here.",
      hidden: true,
      to: "phoenix.stacktrace_depth"
    ],
    "exred_ui.ecto_repos": [
      commented: false,
      datatype: [
        list: :atom
      ],
      default: [
        ExredUI.Repo
      ],
      doc: "Provide documentation for exred_ui.ecto_repos here.",
      hidden: true,
      to: "exred_ui.ecto_repos"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.secret_key_base": [
      commented: false,
      datatype: :binary,
      default: "lNynDH9TigJu4E18vTfeAXKJUU6Vx8ARmpuFUW3DXOTdGiKSKktPPswoWAhx9LwW",
      doc: "Provide documentation for exred_ui.Elixir.ExredUIWeb.Endpoint.secret_key_base here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.secret_key_base"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.render_errors.view": [
      commented: false,
      datatype: :atom,
      default: ExredUIWeb.ErrorView,
      doc: "Provide documentation for exred_ui.Elixir.ExredUIWeb.Endpoint.render_errors.view here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.render_errors.view"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.render_errors.accepts": [
      commented: false,
      datatype: [
        list: :binary
      ],
      default: [
        "json",
        "json-api"
      ],
      doc: "Provide documentation for exred_ui.Elixir.ExredUIWeb.Endpoint.render_errors.accepts here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.render_errors.accepts"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.pubsub.name": [
      commented: false,
      datatype: :atom,
      default: ExredUI.PubSub,
      doc: "Provide documentation for exred_ui.Elixir.ExredUIWeb.Endpoint.pubsub.name here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.pubsub.name"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.pubsub.adapter": [
      commented: false,
      datatype: :atom,
      default: Phoenix.PubSub.PG2,
      doc: "Provide documentation for exred_ui.Elixir.ExredUIWeb.Endpoint.pubsub.adapter here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.pubsub.adapter"
    ],
    "exred_ui.Elixir.ExredUI.Repo.adapter": [
      commented: false,
      datatype: :atom,
      default: Ecto.Adapters.Postgres,
      doc: "Provide documentation for exred_ui.Elixir.ExredUI.Repo.adapter here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUI.Repo.adapter"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.debug_errors": [
      commented: false,
      datatype: :atom,
      default: true,
      doc: "Provide documentation for exred_ui.Elixir.ExredUIWeb.Endpoint.debug_errors here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.debug_errors"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.code_reloader": [
      commented: false,
      datatype: :atom,
      default: false,
      doc: "Provide documentation for exred_ui.Elixir.ExredUIWeb.Endpoint.code_reloader here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.code_reloader"
    ],
    "exred_ui.Elixir.ExredUIWeb.Endpoint.check_origin": [
      commented: false,
      datatype: :atom,
      default: false,
      doc: "Provide documentation for exred_ui.Elixir.ExredUIWeb.Endpoint.check_origin here.",
      hidden: true,
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.check_origin"
    ],
  ],
  transforms: [
    "guardian.Elixir.Guardian.ttl": fn conf ->
      case Conform.Conf.get(conf, "guardian.Elixir.Guardian.ttl") do
        [{_key, [num, period]}] -> {String.to_integer(num), String.to_atom(period)}
        _ -> nil
      end
    end
  ],
  validators: []
]
