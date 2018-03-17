defmodule ExredWeb.FlowView do
  use ExredWeb, :view
  use JaSerializer.PhoenixView
  alias ExredWeb.FlowView

  attributes [:name, :info, :config, :service_id]

  has_many :nodes,
    serializer: ExredWeb.NodeView,
    include: false,
    identifiers: :always #when_included

  has_many :connections,
    serializer: ExredWeb.ConnectionView,
    include: false,
    identifiers: :always #when_included

  def nodes(struct, conn) do
    case struct.nodes do
      %Ecto.Association.NotLoaded{} ->
        struct
        |> Ecto.assoc(:nodes)
        |> Exred.Repo.all
      other -> other
    end
  end


  def connections(struct, conn) do
    case struct.connections do
      %Ecto.Association.NotLoaded{} ->
        struct
        |> Ecto.assoc(:connections)
        |> Exred.Repo.all
      other -> other
    end
  end

  #
  # def render("index.json", %{flows: flows}) do
  #   %{data: render_many(flows, FlowView, "flow.json")}
  # end
  #
  # def render("show.json", %{flow: flow}) do
  #   %{data: render_one(flow, FlowView, "flow.json")}
  # end
  #
  # def render("flow.json", %{flow: flow}) do
  #   %{id: flow.id,
  #     name: flow.name,
  #     type: flow.type,
  #     info: flow.info,
  #     config: flow.config}
  # end
end
