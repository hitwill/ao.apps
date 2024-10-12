local sqlite3 = require("lsqlite3")
local json = require("json")


DB = DB or sqlite3.open_memory()

Handlers.once(
  "dbsetup",
  { Action = "DBSetup" },
  function(msg)
    local response = DB:exec [[
      CREATE TABLE resources (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          link TEXT NOT NULL UNIQUE,
          description TEXT NOT NULL,
          type TEXT NOT NULL,
          category TEXT NOT NULL,
          tags TEXT NOT NULL,
          ecosystem TEXT NOT NULL,
          votes INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    ]]
    ao.send({
      Target = msg.From,
      Data = json.encode(response)
    })
  end
)

Handlers.add(
  "fetch",
  { Action = "Fetch" },
  function(msg)
    local results = {}
    for row in DB:nrows(msg.Data) do
      local rowData = {}
      for k, v in pairs(row) do
        rowData[k] = v
      end
      table.insert(results, rowData)
    end
    ao.send({
      Target = msg.From,
      Data = json.encode(results)
    })
  end
)

Handlers.add(
  "insert",
  { Action = "Insert" },
  function(msg)
    local response = DB:exec(msg.Data)
    local result = json.encode({ response = response })

    ao.send({
      Target = msg.From,
      Data = result
    })
  end
)

Handlers.add(
  "truncate",
  { Action = "Truncate" },
  function(msg)
    local tableName = msg.Data
    local query = string.format("DELETE FROM %s", tableName)
    local response = DB:exec(query)
    local result = json.encode({ response = response })

    ao.send({
      Target = msg.From,
      Data = result
    })
  end
)


Handlers.add(
  "updateone",
  { Action = "UpdateOne" },
  --[[
   "Data": {
      "table": "resources",
      "set": "name = ?, description = ?, votes = ?",
      "values": ["Updated Resource Name", "This is an updated description", 10, 1]
    }
  ]]
  function(msg)
    local data = json.decode(msg.Data)
    local query = string.format("UPDATE %s SET %s WHERE id = ?", data.table, data.set)
    local stmt = DB:prepare(query)
    stmt:bind_values(table.unpack(data.values))
    local response = stmt:step()
    stmt:finalize()
    local result = json.encode({ response = response })

    ao.send({
      Target = msg.From,
      Data = result
    })
  end
)

Handlers.add(
  "deleteone",
  { Action = "DeleteOne" },
  --[[
    "Data": {
      "table": "resources",
      "id": 1
    }
  ]]
  function(msg)
    local data = json.decode(msg.Data)
    local query = string.format("DELETE FROM %s WHERE id = ?", data.table)
    local stmt = DB:prepare(query)
    stmt:bind_values(data.id)
    local response = stmt:step()
    stmt:finalize()
    local result = json.encode({ response = response })

    ao.send({
      Target = msg.From,
      Data = result
    })
  end
)

Handlers.add(
  "fetchone",
  { Action = "FetchOne" },
  --[[
    "Data": {
      "table": "resources",
      "id": 1
    }
  ]]
  function(msg)
    local data = json.decode(msg.Data)
    local query = string.format("SELECT * FROM %s WHERE id = ? LIMIT 1", data.table)
    local stmt = DB:prepare(query)
    stmt:bind_values(data.id)
    local row = stmt:step()
    local result = {}
    if row then
      for i = 0, stmt:columns() - 1 do
        result[stmt:column_name(i)] = stmt:column_value(i)
      end
    end
    stmt:finalize()

    ao.send({
      Target = msg.From,
      Data = json.encode(result)
    })
  end
)
