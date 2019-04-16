function getName (user) {

	var msgBody = 'Para finalizar o seu cadastro gostaríamos de faze mais algumas perguntinhas ... \n Qual o seu nome?'
	
	return msgBody;
	
}


export const profile = (method ,phone) => {

	var body = '';

	switch(method) {
		case 'registered': body = getName()
	}

	const response = {
		action: 'send',
		body: body
	}

	return response
}