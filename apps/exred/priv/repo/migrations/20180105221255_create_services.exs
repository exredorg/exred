defmodule Exred.Repo.Migrations.CreateServices do
  use Ecto.Migration

  def change do
    create table(:services, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string
      add :type, :string
      add :info, :string
      add :config, :map

      timestamps()
    end

  end
end
