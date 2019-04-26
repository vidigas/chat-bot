import color from 'colors';

import Bot from './Bot';
import { log } from './Bot/helper';

//the class ChatInterface is used to develop the bot locally

//it will become a POST request that receives an user and a message and returns the answer

class ChatInterface {
	constructor(user){

		this.user = user.toString();

	}

 	async chat(output) {
 		
 		//output header
		this.writeMessageHeader('Bot: ');

	 	
		//sleep
	 	await new Promise(r => setTimeout(r, 1000))

 		// write answer body
	 	await this.speak(output);

	 	//input header
		this.writeMessageHeader('Me: ');


	 	// listen for user input
		this.listen();
}

	async speak(output) {

		const stdout = process.stdout;
		stdout.write(color.green(output +  '\n'));
	}

	async listen(){

		const stdin = process.stdin;
		stdin.resume();

		await stdin.once('data', await this.callProcessMessage.bind(this));
}

	async callProcessMessage (input) {
		input = input.toString().trim();

		const bot = new Bot(this.user)

		const response = await bot.processMessage(input);

		if(!response) return this.chat('Desculpa, não escutei. Pode repetir. :)');

		return this.chat(response.body);

	}

	writeMessageHeader(subject){
		const stdout = process.stdout;

		stdout.write(color.yellow('\n' + subject));
	}

}



(function init() {
	const stdout = process.stdout;
	const stdin = process.stdin;


	stdout.write(color.red('\n\n\n' + 'Insira um número de celular para iniciar uma conversa' + '\n\n\n'));
	stdin.resume();

	 stdin.once('data', (user) => {

		var app = new ChatInterface( user );

	stdout.write(color.red('\n\n\n' + 'Inicializando chat . . . Comece a conversa' + '\n\n\n'));


	app.writeMessageHeader('Me :');

		return app.listen() });
})()
	


