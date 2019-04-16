import axios from 'axios';

export const getUser = (phone) => {
	const url = `http://localhost:8080/users/${phone}`;
  return axios.get(url);
};

export const createUser = (phone, role) => {
	const data = { phone, role}
	return axios.post('http://localhost:8080/users', data);
}
