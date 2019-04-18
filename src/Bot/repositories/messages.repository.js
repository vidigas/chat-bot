import axios from 'axios';

export const getPhoneMessage = (phone) => {
	const url = `http://localhost:8080/messages/${phone}`;
  return axios.get(url);
};

export const postMessage = (body) => {
	const data = {
            phone: body.context.phone,
            state:body.context.state,
            text: body.input
            //datetime: body.datetime
            }
	return axios.post('http://localhost:8080/messages', data);
}
export const postResponse = (body) => {
	const data = {
            phone: body.phone,
            state:body.state,
            text: body.text,
            //datetime: body.datetime
            action: body.action,
            messageid:body.message,
            confirm:'false',
            }
	return axios.post('http://localhost:8080/messages', data);
}
