[
  extends: [],
  import: [],
  mappings: [


    "log_level": [
      commented: false,
      datatype: :atom,
      default: :debug,
      doc: "Console log level",
      hidden: false,
      to: "logger.console.level"
    ],

    "exred.Elixir.ExredWeb.Endpoint.secret_key_base": [
      commented: false,
      datatype: :binary,
      default: "lNynDH9TigJu4E18vTfeAXKJUU6Vx8ARmpuFUW3DXOTdGiKSKktPPswoWAhx9LwW",
      doc: "Random string used by Phoenix to encrypt cookies",
      hidden: false,
      to: "exred.Elixir.ExredWeb.Endpoint.secret_key_base"
    ],
    

    "endpoint.http.port": [
      commented: false,
      datatype: :integer,
      default: 4000,
      doc: "Provide documentation for exred.Elixir.ExredWeb.Endpoint.http.port here.",
      hidden: false,
      to: "exred.Elixir.ExredWeb.Endpoint.http.port"
    ],
    "endpoint.url.host": [
      commented: false,
      datatype: :binary,
      default: "localhost",
      doc: "Provide documentation for exred.Elixir.ExredWeb.Endpoint.url.host here.",
      hidden: false,
      to: "exred.Elixir.ExredWeb.Endpoint.url.host"
    ],
    "endpoint.url.port": [
      commented: false,
      datatype: :integer,
      default: 4000,
      doc: "Provide documentation for exred.Elixir.ExredWeb.Endpoint.url.port here.",
      hidden: false,
      to: "exred.Elixir.ExredWeb.Endpoint.url.port"
    ],


    "db.username": [
      commented: false,
      datatype: :binary,
      default: "zkeszthelyi",
      doc: "Provide documentation for exred.Elixir.Exred.Repo.username here.",
      hidden: false,
      to: "exred.Elixir.Exred.Repo.username"
    ],
    "db.password": [
      commented: false,
      datatype: :binary,
      doc: "Provide documentation for exred.Elixir.Exred.Repo.password here.",
      hidden: false,
      to: "exred.Elixir.Exred.Repo.password"
    ],
    "db.database_name": [
      commented: false,
      datatype: :binary,
      default: "exred_dev",
      doc: "Provide documentation for exred.Elixir.Exred.Repo.database here.",
      hidden: false,
      to: "exred.Elixir.Exred.Repo.database"
    ],
    "db.hostname": [
      commented: false,
      datatype: :binary,
      default: "localhost",
      doc: "Provide documentation for exred.Elixir.Exred.Repo.hostname here.",
      hidden: false,
      to: "exred.Elixir.Exred.Repo.hostname"
    ],
    "db.conn_pool_size": [
      commented: false,
      datatype: :integer,
      default: 10,
      doc: "Provide documentation for exred.Elixir.Exred.Repo.pool_size here.",
      hidden: false,
      to: "exred.Elixir.Exred.Repo.pool_size"
    ]
  ],
  transforms: [],
  validators: []
]
