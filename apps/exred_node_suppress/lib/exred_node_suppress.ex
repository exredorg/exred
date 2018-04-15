defmodule Exred.Node.Suppress do
  @moduledoc """
  Suppresses or filters incoming messages for configurable time periods.
  
  ###Inputs
  
    `topic :: string`  
    if message suppression starts when triggered then a message with '_START' topic triggers the suppression
    otherwise topic is ignored

    `payload :: term | number`  
    if suppressing a band then payload needs to be number (it'll get compared to the less\\_then and greater\\_then limits)
  """

  @name "Suppress"
  @category "function"
  @info @moduledoc
  @config [
    name: %{
      info: "Visible node name",
      value: @name, 
      type: "string", 
      attrs: %{max: 20}
    },
    per_topic: %{
      info: "Suppress per topic or regardless of topic",
      type: "select",
      value: true,
      attrs: %{options: [true, false]}
    },
    start_when: %{
      info: "Start suppressing when the flow is deployed or when a message with topic: '_START' arrives",
      type: "select",
      value: "triggered",
      attrs: %{options: ["deployed", "triggered"]}
    },
    how_long: %{
      info: "How long should messages be suppressed for?",
      type: "select",
      value: "time_period",
      attrs: %{options: ["forever", "time_period"]}
    },
    time_period: %{
      info: "Time period in milliseconds",
      type: "number",
      value: 100,
      attrs: %{min: 1, max: 3600000} 
    },
    what: %{
      info: "What to suppress",
      type: "select",
      value: "all",
      attrs: %{options: ["all", "band"]}
    },
    band_less_then: %{
      info: "Suppress message if payload is less then",
      type: "number",
      value: 0
    },
    band_greater_then: %{
      info: "Suppress message if payload is greater then",
      type: "number",
      value: 1000
    }
  ]
  @ui_attributes [
    fire_button: false, 
    right_icon: "gavel"
  ]
  
  use Exred.Library.NodePrototype
  require Logger

  @impl true
  def node_init(state) do
    Logger.warn "CONFIG #{inspect state.config}"
    timer_ref = if state.config.start_when.value == "deployed" do
      case state.config.how_long.value do
        "forever" -> :forever
        "time_period" -> 
          {:ok, ref} = :timer.send_after state.config.time_period.value, :_TIMEOUT
          ref
      end
    else
      nil
    end
    state|> Map.put(:timer_ref, timer_ref)
  end

  # start a new timer
  # TODO: cancel the old timer
  @impl true
  def handle_msg(%{payload: "_START"}, %{config: %{start_when: %{value: "triggered"}}} = state) do
    timer_ref = case state.config.how_long.value do
        "forever" -> :forever
        "time_period" -> 
          {:ok, ref} = :timer.send_after state.config.time_period.value, :_TIMEOUT
          ref
      end
    {nil, %{state | timer_ref: timer_ref}}
  end
  
  # clear timer_ref from state
  def handle_msg(:_TIMEOUT, state) do
    {nil, %{state | timer_ref: nil}}
  end
  
  def handle_msg(msg, %{timer_ref: timer_ref} = state) do
    case timer_ref do

      # no timer, forward all messages
      nil -> {msg, state}

      # there's a timer running (or it's set to :forever)
      # this means that we need to suppress messages 
      _ -> 
        case state.config.what.value do
          # suppress all messages
          "all" -> {nil, state}
          
          # suppress if payload is in a certain band
          "band" ->
            if msg.payload < state.config.band_less_then.value or 
               msg.payload > state.config.band_greater_then.value do
              {nil, state}
            else
              {msg, state}
            end
        end
    end
  end

end
