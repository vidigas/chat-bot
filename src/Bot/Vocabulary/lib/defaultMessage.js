function getQuote (user) {

	var msgBody = 'hello NAME*, this is the default message';
	

	return msgBody.replace('NAME*', user);
	
}


export const defaultMessage = (user) => {

	const body = getQuote(user)

	const response = {
		action: 'send',
		body: body
	}

	return response
}