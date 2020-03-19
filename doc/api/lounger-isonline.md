lounger-isonline(3) -- check if a database is online
====================================================

## SYNOPSIS    
    lounger.commands.isonline(url)
    The last part is a detailed description of how the command works:

## DESCRIPTION
check if a CouchDB / PouchDB database is available on the currentnetwork.

    url:
    The url must be a `String` and must be a url using the http or httpsprotocol.
    The command returns a promise. The promise returns an Object. 
    The key of the Object is the provided url and the values are of type `Boolean`.
    `true` indicates an online CouchDB / PouchDB node.

lounger-isonline(1) -- check if a database is online
====================================================

## SYNOPSIS    
    lounger isonline <url> [--json]

## DESCRIPTION  
    <url>:Check if a database node is currently online or available.
    `isonline` prints the result as human readable output. JSON output is also supported by passing the `--json` flag.