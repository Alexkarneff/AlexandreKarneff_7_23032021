function create(data) {
	const url="http://localhost:3000/api/auth/signup";
	
	fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json", 
		},
		body: JSON.stringify(data)
	})
	.then(function(res) {
		if (res.ok) {
			return res.status(201).json();
		}
	})
	.catch(function(err) {
		console.log(err);
	})
}

import axios from 'axios';

// axios import
const apiClient = axios.create({
	baseURL: 'http://localhost:3000/api',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
});


function logIn(data) {
	return apiClient.post('/auth/login', data);
}

function deleteAccount(id, token) {
	return apiClient.delete('users/myaccount/' + id,
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}

export default {
	create, logIn, deleteAccount
}