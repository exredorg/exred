defmodule ExredUI.Editor.Flow do
  use Ecto.Schema
  import Ecto.Changeset
  alias ExredUI.Editor.Flow

  @primary_key {:id, :binary_id, autogenerate: true}
  @derive {Phoenix.Param, key: :id}

  schema "flows" do
    field :type, :string

    field :name, :string
    field :info, :string
    field :config, :map

    belongs_to :service, ExredUI.Editor.Service, type: :binary_id

    has_many :nodes, ExredUI.Editor.Node
    has_many :connections, ExredUI.Editor.Connection

    timestamps()
  end

  @doc false
  def changeset(%Flow{} = flow, attrs) do
    flow
    |> cast(attrs, [:name, :type, :info, :config])
    |> validate_required([:name, :type, :info, :config])
  end
end
