defmodule Exred.Node.RedisIn do
  @moduledoc """
  A Redis input node.
  
  Select the Redis command in the config tab.
  
  Expects command arguments in msg.payload either as a list or a string if
  there's only one argument.
  
  Examples: 
  
  **GET command:**  
  msg.payload = ["myKey"]  
  OR  
  msg.payload = "myKey"

  **LRANGE command:**  
  msg.payload = [0, 9]
  """

  @name "Redis In"
  @category "input"
  @info @moduledoc
  @config %{
    connection_name: %{type: "string", value: "redis"},
    command: %{type: "select", value: "GET", attrs: %{options: ["GET", "LPOP", "LRANGE"]}},
    name: %{type: "string", value: ""}
  }
  @ui_attributes %{left_icon: "send"}
  
  use Exred.Library.NodePrototype


  @impl true
  def handle_msg(msg, state) do
    redix_conn = String.to_atom state.config.connection_name.value
    redix_cmd = if is_list(msg.payload) do
      [state.config.command.value| msg.payload]
    else 
      [state.config.command.value, msg.payload]
    end
    result = Redix.command! redix_conn, redix_cmd
    
    msg_out = %{msg| payload: result}
    
    {msg_out, state}
  end
end
