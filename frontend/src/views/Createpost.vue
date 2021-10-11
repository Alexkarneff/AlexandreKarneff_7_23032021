<template>
<!-- eslint-disable  -->
  <div class="home">
        <Navbar/>
    <h2>Créez votre post ici !</h2>
    <div class="formCreate">
      <Createpost @createPost="createPost"/>
    </div>
    <div v-if="submitted" class="submissionSuccess">
			<h4>You've submitted successfully!</h4>
		</div>

  </div>
</template>

<script>
import Createpost from "@/components/Createpost.vue";
import Navbar from "@/components/Navbar.vue";
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';

export default {
	name: "SignUp",
	components: {
		Createpost,
    Navbar
	},
  setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore();
    const submitted = ref(false);
    
    async function createPost(postData) {
			const postAdded = await store.dispatch('fetchCreatePost', postData);
			if (postAdded) {
				// afficher la div verte pendant 2.5s
				submitted.value = true;
				setTimeout(()=> {
					submitted.value = false;
				}, 2500);
				goToPostPage();
			}
		}

    const goToPostPage = () => {
			const redirectPost = route.query.redirect || '/post';
			router.push(redirectPost);
		}

    return { createPost, submitted }
  } 
};
</script>


<style lang="scss" scoped>
.home {
  width: 75%;
  margin: 0 auto;
  z-index: -1000;
  padding: 3%;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}
h1 {
  text-align: center;
  margin: 0 auto 50px;

  img {
    width: 30px;
    margin-right: 10px;
  }
}

h3 {
  letter-spacing: 1px;
  font-weight: normal;
  line-height: 40px;
}

.formCreate {
  font-size: 16px;
  width: 90%;
  margin: 80px auto 60px;

  .filterBox {
    font-size: 16px;
    width: 300px;
    height: 40px;
    outline: none;
    border: none;
    border-radius: 3px;
    padding-left: 1%;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  }

  button {
    width: 200px;
    font-size: 18px;
    padding: 12px;
    background-color: #ab1f03;
    color: white;
    border: none;
    font-weight: bold;
    border-radius: 3px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
}

@media screen and (max-width: 1200px) {
  .home {
    width: 100%;
    padding: 50px 0;

    h2,
    h3 {
      width: 80%;
      margin: 20px auto;
    }

  }
}

@media screen and (max-width: 599px) {
  .home {
    width: 100%;
    padding: 30px 0;

    h1 {
      margin: 0 auto 30px;
      font-size: 24px;

      img {
        width: 15px;
      }
    }

    h2,
    h3 {
      width: 90%;
      margin: 10px auto;
      line-height: 20px;
    }

    h2 {
      font-size: 18px;
    }
    h3 {
      font-size: 16px;
    }

  }
}
</style>