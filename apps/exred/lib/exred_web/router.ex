defmodule ExredWeb.Router do
  use ExredWeb, :router

  pipeline :api do
    plug :accepts, ["json", "json-api"]
    plug JaSerializer.Deserializer
  end

  scope "/api", ExredWeb do
    pipe_through :api
    resources "/services", ServiceController, except: [:new, :edit]
    resources "/flows", FlowController, except: [:new, :edit]
    resources "/connections", ConnectionController, except: [:new, :edit]
    resources "/nodes", NodeController, except: [:new, :edit]
  end
end
