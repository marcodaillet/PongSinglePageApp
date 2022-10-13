This project is about creating a website for the mighty Pong contest!  
The website backend is written in NestJS, the frontend is written in React TypeScript and we used a PostgreSQL database.  
The website is a single-page application working on all browsers and behaving like a normal website.  

To launch:
```
make
```
Here is a list of features implemented in this project:

**User**
- The user can login using the OAuth system of 42 intranet.
- The user can personalize his profile (name, avatare, etc).
- The user can enable two-factor authentication. For instance, Google Authenticator.
- The user can add other users as friends and see their current status (online, offline, in a game, and so forth).
- Stats (such as: wins and losses, ladder level, and so forth) are displayed on the user profile.
- Each user has a Match History that can be consulted by other users.  

**Chat**
- The user can create channels (chat rooms) that can be either public, or private, or protected by a password.
- The user can send direct messages to other users.
- The user can block other users. This way, they will see no more messages from the account they blocked.
- The channel owner can set a password required to access the channel, change it, and also remove it.
- The administrators of a channel can ban or mute users for a limited time.
- The user can invite other users to play a Pong game through the chat interface.
- The user can access other players profiles through the chat interface.

**Game**
- Users can play a live Pong game versus another player directly on the website.
- The user can join a queue until they get automatically matched with someone else.
- The game must be responsive!
- The user can watch a live play between other users without interfering with it.

**What I learnt:**
 - Javascript
 - Typescript
 - NestJS/NodeJs
 - How to manipulate a PostgreSQL database with TypeOrm
 - React
 - Websockets
