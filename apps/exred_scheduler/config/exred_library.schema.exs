[
  extends: [],
  import: [],
  mappings: [
    "exred_library.psql_conn.username": [
      commented: false,
      datatype: :binary,
      default: "exred_user",
      doc: "DB username",
      hidden: false,
      env_var: "EXRED_DB_USERNAME",
      to: "exred_library.psql_conn.username"
    ],
    "exred_library.psql_conn.password": [
      commented: false,
      datatype: :binary,
      doc: "DB password",
      hidden: false,
      env_var: "EXRED_DB_PASSWORD",
      to: "exred_library.psql_conn.password"
    ],
    "exred_library.psql_conn.database": [
      commented: false,
      datatype: :binary,
      default: "exred_ui_dev",
      doc: "DB name",
      hidden: false,
      env_var: "EXRED_DB_NAME",
      to: "exred_library.psql_conn.database"
    ],
    "exred_library.psql_conn.hostname": [
      commented: false,
      datatype: :binary,
      default: "localhost",
      doc: "DB server hostname",
      hidden: false,
      env_var: "EXRED_DB_HOSTNAME",
      to: "exred_library.psql_conn.hostname"
    ],
    "exred_library.psql_conn.port": [
      commented: false,
      datatype: :integer,
      default: 5432,
      doc: "DB server port",
      hidden: false,
      env_var: "EXRED_DB_PORT",
      to: "exred_library.psql_conn.port"
    ]
  ],
  transforms: [],
  validators: []
]
