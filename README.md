# This is the back-end for a FUT Team Builder WebApp.

## Includes a database & api

### Current Functionality:

- Create new team with a given name and return it:
  > PUT `/team/{teamName}`
- Delete a specific team given a team id or name:
  > DELETE `/team/{teamIdOrName}`
- Get a specific team given a team id or name:
  > GET `/team/{teamIdOrName}`
- Add a player to a specific team given a team id and a player id. Returns the new updated team:
  > PUT `/team/{teamId}/player/{playerId}`
- Delete a player from a specific team given a team id and a player id. Returns the new updated team:
  > DELETE `/team/{teamId}/player/{playerId}`

## To start the server run:

`npm run dev`
