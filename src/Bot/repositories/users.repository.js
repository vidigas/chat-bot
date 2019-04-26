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
		console.log('estou updatando user');
	const data = body;
	console.log(body);
	return axios.put(`http://localhost:8080/users/${phone}`, data);
}

export const postAction = async (response)=> {
	console.log('estou aqui');
	var actionStr = response.action;
	var actions = JSON.parse(actionStr);
		for(var i=0;i<Object.keys(actions).length;i++){
			console.log(actions[i].action)
			switch(actions[i].action){
				case 'update':
				try{
				console.log('update',actions[i]);
				console.log(response.phone,actions[i].obj)
				const user = await updateUser(response.phone, eval(actions[i].obj));
				} catch(err){user=1;return user;}
				break;
				default:
				console.log('nothing',actions[i]);
			}
		}
	return actions[0];
  }