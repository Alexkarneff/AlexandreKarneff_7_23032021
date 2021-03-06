import { createStore } from 'vuex';
import userService from '@/services/users.js';
import postService from '@/services/posts.js';
import commentService from '@/services/comments.js';
import createPersistedState from "vuex-persistedstate";
import router from '../router';

let state = {
    userLogged: false,
    posts: [],
    user: {},
    token: '',
};

const mutations = {

    LOG_USER(state) {
        state.userLogged = true;
    },

    SET_USER_INFO(state, data) {
        state.user = data;
    },

    SET_TOKEN(state, token) {
        state.token = token;
    },

    SET_POSTS(state, posts) {
        state.posts = posts;
    },

    ADD_NEW_POST(state, post) {
        const usersLiked = [];
        post = {...post, usersLiked };
        state.posts = { post, ...state.posts };
    },

    DELETE_POST(state, posts) {
        state.posts = posts;
    },

    CLEAR_STORE(state) {
        state.posts = [],
            state.user = {},
            state.token = '',
            state.userLogged = false
            localStorage.clear();
    }

};
const actions = {

    // Log In
    async fetchLogIn(context, data) {
        const response = await userService.logIn(data);
        context.commit('SET_USER_INFO', response.data.user);
        localStorage.setItem("token", response.data.token);
        context.commit('SET_TOKEN', response.data.token);
        context.commit('LOG_USER');
        router.push("/post");
        return state.userLogged;
    },

    // Create a post
    async fetchCreatePost(context, postData) {   
        const response = await postService.createPost(postData, localStorage.getItem("token"));
        if (response.status == 201) {
            context.commit('ADD_NEW_POST', response.data.newPost);
            return true;
        }
    },

    async fetchGetAllPosts(context) {
        const response = await postService.getAllPosts(localStorage.getItem("token"));
        if (response.status === 200) {
            context.commit('SET_POSTS', response.data);
        }
    },

    async fetchDeletePost(context, id) {
        const token = context.getters.getToken;
        const response = await postService.deletePost(id, token);
        if (response.status == 200) {
            context.commit('DELETE_POST', response.data.posts);
            return true;
        }
    },

	async fetchDeleteAccount (context, id) {
		const response = await userService.deleteAccount( id ,localStorage.getItem("token"));
		if (response.status === 200) {
			context.commit('CLEAR_STORE');
			return true;
		}
	},

    async fetchCreateComment(context, commentData) {
		const created = await commentService.createComment(commentData, localStorage.getItem("token"));
		return created;
	},

    async fetchDeleteComment(context, id){
		const response = await commentService.deleteComment(id, localStorage.getItem("token"));
		if (response.status == 200 ) {
			context.commit('SET_POSTS', response.data);
			return true;
		}
	},



}

const getters = {

    getToken: (state) => {
        return state.token;
    },

    getUserId: (state) => {
        return state.user.id;
    },
    isUserLogged: (state) => {
        console.log(state.userLogged);
        return state.userLogged;
    }
}

const store = createStore({
    state,
    mutations,
    actions,
    getters,
    plugins: [createPersistedState()]
});

export default store;