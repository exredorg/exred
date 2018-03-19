defmodule ExredWeb.IndexController do
  use ExredWeb, :controller
  
  def index(conn, _params) do
    index_path = List.to_string(:code.priv_dir(:exred)) <> "/static/index.html"
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(200, index_path)
  end

end