# Stupid-generals
A server that runs a stupid version of the beloved game, generals.io, without all the messy bits like the client slug for actually playing the game. Meant as a parody of the original game, and to keep the memory alive in the hearts of players in the rapidly developing world of AI content developers creating redstone circuits made with 50% copper bulbs.
## Explanation of the game:
Developers and strategists alike love the game, but they like custom bots and client UX for neuanced, superfast, advanced gameplay even more.
#### Q: Can AI play?
  - Yes, obviously
#### Q: Can I build a client UI for me to play against AI with custom commands?
  - I hope!!
#### Q: Can I open source my custom client?
  - It depends, are you a hero?
# The current goals in order of priority as of October 28th 2023:
1) Finish the server game code
    - Login users
      - TODO:
        - Hash name and password
        - Store player data on logout
        - Social platform login
        - SessionID authorization
      - Done:
        - User can login with a name an a password
        - Multiple users cannot login with the same user name
        - Wrong password gives error state
        - Registration -> Login
        - Error State
    - Allow for selecting a game mode which will put the client in line to play, and indicate about how long it will take to find a match. The match will automatically start when it's their turn.
    - Present three game modes:
      - Evolution: Changes the play environment slowly over time. Or suddenly in the case of an occasional extinction event...
      - Empty: Changes nothing, has nothing but an empty map and two generals
      - Random: Sets random game mode every hour or so
    - Play the generals game as quickly as possible over a socket connection 60 hurtz is a good benchmark.
    - Show connected users
    - Show leaderboards
2) Finish the client game view UI and some basic interaction functions that listen for server events
3) Split this repo in two: server, client
4) Leave the client code in here, public for any developer to clone
5) For a developer to play on the server, they clone the client code and write a bot to play for them
# Feel free to help!