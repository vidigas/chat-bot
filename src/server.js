
import express from 'express';
import bodyParser from 'body-parser';

// import { PORT } from './env.config';

import Bot from './Bot';


const PORT = process.env.PORT || 8888;

const app = express();

app.use(bodyParser.json());

app.post('/message/:phone', async (req, res) => {
	console.log('bateu aquiiiiii', console.log(req.params))

	const bot = new Bot(req.params.phone);

	const response = await bot.processMessage(req.body.message);


		if(!response){
			
			var data = {	user: req.params.user , action: 'send',canal :'whatsapp' ,body: 'Desculpa, não escutei. Pode repetir. :)' }
		 
		  res.status(200).send(data)

		 return

		}

		//bot queue emitter vai entrar aqui, e vai direcionar as mensagens baseadas no canal e usuario.
		
		res.status(200).send(response)

	})


		app.listen(PORT, err => {
			if(err) {
				console.log(err);
			} else {
				console.log(`Server Running - Listening to port ${PORT}`);
			}
		})	



