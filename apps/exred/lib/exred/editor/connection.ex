defmodule Exred.Editor.Connection do
  use Ecto.Schema
  import Ecto.Changeset
  alias Exred.Editor.Connection

  @primary_key {:id, :binary_id, autogenerate: true}
  @derive {Phoenix.Param, key: :id}

  schema "connections" do
    field :config, :map
    field :source_anchor_type, :string
    field :target_anchor_type, :string

    belongs_to :source, Exred.Editor.Node, type: :binary_id, foreign_key: :source_id
    belongs_to :target, Exred.Editor.Node, type: :binary_id, foreign_key: :target_id

    belongs_to :flow, Exred.Editor.Flow, type: :binary_id

    timestamps()
  end

  @doc false
  def changeset(%Connection{} = connection, attrs) do
    connection
    |> cast(attrs, [:id, :source_id, :target_id, :flow_id, :config, :source_anchor_type, :target_anchor_type])
    |> validate_required([:id, :source_id, :target_id, :flow_id, :config])
  end
end
