import axios from 'axios';

export const getUser = (phone) => {
	const url = `http://localhost:8080/users/${phone}`;
  return axios.get(url);
};

export const createUser = (phone, role) => {
	const data = { phone, role}
	return axios.post('http://localhost:8080/users', data);
}

export const updateUser = async (phone,body) => {
		// coloquei body=body para dar update só o que for relevante. depois tem que checar se tudo certo aqui.
	console.log(' updating user',phone);
	const data = body;
	console.log(body);
	return axios.put(`http://localhost:8080/users/${phone}`, data);
}

export const postAction = async (response)=> {
	var actionStr = response.action;
	var actions = JSON.parse(actionStr);
		for(var i=0;i<Object.keys(actions).length;i++){
			switch(actions[i].action){
				case 'update':
				try{
				const user = await updateUser(response.phone, eval(actions[i].obj));
				} catch(err){throw err}
				break;
				default:
				console.log('nothing',actions[i]);
			}
		}
	return actions[0];
  }