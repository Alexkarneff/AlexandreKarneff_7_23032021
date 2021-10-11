import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'http://localhost:3000/api',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
});

function createPost(postFormData, token) {
	return apiClient.post('/posts', postFormData, 
		{ headers: {
			"Content-Type": "multipart/form-data",
			"Authorization": "BEARER " + token
		}}
	);
}

function getAllPosts(token) {
	return apiClient.get('/posts',
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}

function deletePost(id, token) {
	return apiClient.delete('/posts/' + id,
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}


export default {
    createPost, getAllPosts, deletePost
}