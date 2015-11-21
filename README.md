# biawak
linux system monitoring with fancy graphs and shit


Todo: 

* Watch certain files (logs) for changes
* Push log new lines into Firebase


events/{id}
  -- type
  -- timestamp
  -- rawstring
  -- props
     -- foo
     -- bar
     -- baz 

ipaddress/{ip}
  -- range
  -- requests
    -- https
    -- http
    -- ssh
  -- geo
    -- country
    -- region
    -- city
    -- ll
