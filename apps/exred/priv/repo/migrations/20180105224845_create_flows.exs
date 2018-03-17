defmodule Exred.Repo.Migrations.CreateFlows do
  use Ecto.Migration

  def change do
    create table(:flows, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string
      add :type, :string
      add :info, :string
      add :config, :map
      add :service_id, references(:services, on_delete: :nothing, type: :uuid)

      timestamps()
    end

    create index(:flows, [:service_id])
  end
end
