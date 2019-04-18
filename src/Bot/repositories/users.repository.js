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
	return axios.put(`http://localhost:8080/users/${phone}`, data);
}

