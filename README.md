# Simple discord general purpose bot

## A simple discord bot for any server written in js


### Requirements:<br>
- I used <a href="https://nodejs.org/en">nodejs</a> runtime envrioment which is required as you need npm
- Use npm to install the <a href="https://discord.js.org/">discord.js</a> & <a href="https://www.npmjs.com/package/dotenv">dotenv</a> & <a href="https://www.npmjs.com/package/rss-parser">rss-parser</a>


### .env File:
- You will need to create a file with the main directory with
    - Your bot token
        - TOKEN
    - Your guild id
        - GUILD_ID
    - Your bot's client id
        - CLIENT_ID


### How To Use:
- index.js
    - index.js is the main file that you need to run for the bot to be active
    - Without this file running the bot will be offline
    - Visual guide:
        - While not running file<br>
            ![alt text](assets/imgs/offline.png)
        - While running file<br>
            ![alt text](assets/imgs/online.png)

- register-commands.js
    - Run this file to register slash commands
        - You only need to run this once to register the commands
        - You can add as many of the objects below which are the descriptors (as shown bellow)
        - When command registry is successful it will print "Registered commands successfully!" to the console



### Slash commands:
```
/rules
```
- Sends a list of pre-defined server rules
```
/calculator
```
- add / subtract / multiply / divide 2  numbers of choice
```
/news
```
- Replies with the top 5 news strories on bleeping computer from their RSS feed
