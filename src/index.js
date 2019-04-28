import server from './server';

import Bot from './Bot';
var fs = require('fs');

const bot = new Bot();

bot.init();

var app = server(bot);
				
const PORT = process.env.PORT || 8888;

app.listen(PORT, err => {
	if(err) {
		console.log(err);
	} else {
			console.log(`Server Running - Listening to port ${PORT}`);
		}
})	



	