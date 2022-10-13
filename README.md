This project is about creating a website for the mighty Pong contest!  
The website backend is written in NestJS, the frontend must be written in React TypeScript and we used a PostgreSQL database.  
The website is a single-page application working on all browsers and hehaving like a normal website.  

To launch: docker-compose up --build

Here is a list of features implemented in this project:  
User
  • The user can login using the OAuth system of 42 intranet.
  • The user should be able to choose a unique name that will be displayed on the
  website.
  • The user should be able to upload an avatar. If the user doesn’t upload an avatar,
  a default one must be set.
  • The user should be able to enable two-factor authentication. For instance,
  Google Authenticator or sending a text message to their phone.
  • The user should be able to add other users as friends and see their current status
  (online, offline, in a game, and so forth).
  • Stats (such as: wins and losses, ladder level, achievements, and so forth) have to
  be displayed on the user profile.
  • Each user should have a Match History including 1v1 games, ladder, and any-
  thing else useful. Anyone who is logged in should be able to consult it.
Chat
  • The user should be able to create channels (chat rooms) that can be either public,
  or private, or protected by a password.
  • The user should be able to send direct messages to other users.
  • The user should be able to block other users. This way, they will see no more
  messages from the account they blocked.
  • The user who has created a new channel is automatically set as the channel owner
  until they leave it.
  ◦ The channel owner can set a password required to access the channel, change
  it, and also remove it.
  ◦ The channel owner is a channel administrator. They can set other users as
  administrators.
  ◦ The administrators of a channel can ban or mute users for a limited time.
  • The user should be able to invite other users to play a Pong game through the chat
  interface.
  • The user should be able to access other players profiles through the chat interface.
Game
  • Users should be able to play a live Pong game versus another player
  directly on the website.
  • There must be a matchmaking system: the user can join a queue until they get
  automatically matched with someone else.
  • It can be a canvas game, or it can be a game rendered in 3D, it can also be ugly,
  but in any case, it must be faithful to the original Pong (1972).
  • You must offer some customization options (for example, power-ups or different
  maps). However, the user should be able to select a default version of the game
  without any extra features if they want to.
  • The game must be responsive!
  • The user should be able to watch a live play between other users without interfering
  with it.
