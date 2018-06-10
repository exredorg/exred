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

    "exred_ui.Elixir.ExredUIWeb.Endpoint.secret_key_base": [
      commented: false,
      datatype: :binary,
      default: "lNynDH9TigJu4E18vTfeAXKJUU6Vx8ARmpuFUW3DXOTdGiKSKktPPswoWAhx9LwW",
      doc: "Random string used by Phoenix to encrypt cookies",
      hidden: false,
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.secret_key_base"
    ],
    

    "endpoint.http.port": [
      commented: false,
      datatype: :integer,
      default: 4000,
      doc: "UI http port",
      hidden: false,
      env_var: "EXRED_UI_PORT",
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.http.port"
    ],
    "endpoint.url.host": [
      commented: false,
      datatype: :binary,
      default: "localhost",
      doc: "Hostname in URLs",
      hidden: false,
      env_var: "EXRED_UI_HOSTNAME",
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.url.host"
    ],
    "endpoint.url.port": [
      commented: false,
      datatype: :integer,
      default: 4000,
      doc: "Port in URLs",
      hidden: false,
      env_var: "EXRED_UI_PORT",
      to: "exred_ui.Elixir.ExredUIWeb.Endpoint.url.port"
    ],


    "db.username": [
      commented: true,
      datatype: :binary,
      default: "zkeszthelyi",
      doc: "Database username",
      hidden: false,
      env_var: "EXRED_DB_USERNAME",
      to: "exred_ui.Elixir.ExredUI.Repo.username"
    ],
    "db.password": [
      commented: true,
      datatype: :binary,
      doc: "Database password",
      hidden: false,
      env_var: "EXRED_DB_PASSWORD",
      to: "exred_ui.Elixir.ExredUI.Repo.password"
    ],
    "db.database_name": [
      commented: true,
      datatype: :binary,
      default: "exred_ui_dev",
      doc: "Database name",
      hidden: false,
      env_var: "EXRED_DB_NAME",
      to: "exred_ui.Elixir.ExredUI.Repo.database"
    ],
    "db.hostname": [
      commented: true,
      datatype: :binary,
      default: "localhost",
      doc: "Hostname for database connection",
      hidden: false,
      env_var: "EXRED_DB_HOSTNAME",
      to: "exred_ui.Elixir.ExredUI.Repo.hostname"
    ],
    "db.port": [
      commented: true,
      datatype: :integer,
      default: 5432,
      doc: "Port for database connection",
      hidden: false,
      env_var: "EXRED_DB_PORT",
      to: "exred_ui.Elixir.ExredUI.Repo.port"
    ],
    "db.conn_pool_size": [
      commented: false,
      datatype: :integer,
      default: 10,
      doc: "Database connection pool size",
      hidden: false,
      to: "exred_ui.Elixir.ExredUI.Repo.pool_size"
    ]
  ],
  transforms: [],
  validators: []
]
