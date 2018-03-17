defmodule ExredWeb.ConnectionView do
  use ExredWeb, :view
  use JaSerializer.PhoenixView
  alias ExredWeb.ConnectionView

  attributes [:config, :source_id, :target_id, :flow_id, :source_anchor_type, :target_anchor_type]

  # def render("index.json", %{connections: connections}) do
  #   %{data: render_many(connections, ConnectionView, "connection.json")}
  # end
  #
  # def render("show.json", %{connection: connection}) do
  #   %{data: render_one(connection, ConnectionView, "connection.json")}
  # end
  #
  # def render("connection.json", %{connection: connection}) do
  #   %{id: connection.id,
  #     config: connection.config}
  # end
end
