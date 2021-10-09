//import { def } from '@vue/shared';
import { createStore } from 'vuex'


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
}

};
const actions = {

}

const getters = {

}

const store= createStore({
  state,
  mutations,
  actions,
  getters,

});

export default store;