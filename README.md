# chat-bot

this awesome chatbot work as a microservice for a larger project.

you will need to clone and run the api project as well

![Alt text](Public/plantao-zap-chat-bot.jpg?raw=true "Fluxogram")



- [Clone Api](#api)

- [Run Bot](#run-manually-(development))


# Clone Api
## Install:
```bash
git clone git@github.com:vidigas/plantao_zap_api.git
cd plantao-zap-api
npm install
```

## Run dev:
```bash
npm run dev
```


# Run Bot

You have two optins to run this bot.

One is runnig in dev mode to interact with the bot from the terminal window.

The other is to run in api mode and consume through a post request.

## Install
```bash
git clone git@github.com:vidigas/plantao-zap-chat-bot.git
cd plantao-zap-chat-bot
npm install
```

## Run dev ( Playground )

To run the bot and play around in the terminal interface.

Mostly for development purposes. 
```bash
npm run dev 
```

## Run ( Api Endpoint )

Create an endpoint for the Bot to be consumed.

Send messages and receive responses based on the user state and chat context,

```bash

METHOD POST http://localhost:8080/${user_phone} 

REQUEST

body = {
	message: "message body."
}


RESPONSE

body = { 
	user: '123456'
	action: 'send',
	body: body

}
```


## Run
```bash
npm start
```

Start making requests on http://localhost:8080/${user_phone}.


