<template>
  <body>
    <Navbar />
    <div class="home">
      <h1>Hello {{ $store.state.user.firstName }}</h1>

      <h2>Bienvenue sur le réseau social de Groupomania.</h2>
      <h3>Partagez avec la communauté !</h3>

      <div class="userActionsContainer">
        <button v-on:click="goToCreatePost" title="Write a post">
          Créer un post
        </button>
      </div>

      <div class="postsContainer">
        <div class="post" v-for="post in posts" :key="post.id">
          <Posts
            :postId="post.id"
            :authorId="post.userId"
            :authorFirstName="post.User.firstName"
            :authorLastName="post.User.lastName"
            :publicationDate="post.createdAt"
            :imageURL="post.imageURL"
            :postTitle="post.title"
            :postText="post.text"
            :comments="post.Comments"
            @commentPost="commentPost"
            @deletePost="postToDelete"
            @deleteComment="deleteAComment"
          >
          </Posts>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import Navbar from "@/components/Navbar.vue";
import Posts from "@/components/Posts.vue";

export default {
  name: "post",
  components: {
    Navbar,
    Posts
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const posts = computed(() => store.state.posts);

    async function getPosts() {
      await store.dispatch("fetchGetAllPosts");
    }
    getPosts();

    const goToCreatePost = () => {
      const redirectPost = route.query.redirect || "/createPost";
      router.push(redirectPost);
    };

    //Suppression d'un post
    async function postToDelete(id) {
      const deletion = await store.dispatch("fetchDeletePost", id);
      if (deletion) {
				await store.dispatch('fetchGetAllPosts');
      }
    }

    async function commentPost(commentData) {
			let created = await store.dispatch('fetchCreateComment', commentData);
			if (created) {
				await store.dispatch('fetchGetAllPosts');
			}
		}

    async function deleteAComment(id) {
			const deletion = await store.dispatch('fetchDeleteComment', id);
      if (deletion) {
				await store.dispatch('fetchGetAllPosts');
			}
		}

    return {
      goToCreatePost,
      posts,
      console,
      postToDelete,
      commentPost,
      deleteAComment,
    };
  },
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

.userActionsContainer {
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

.postsContainer {
  width: 60%;
  margin: 10px auto 40px;
  padding: 2% 0;

  .post {
    margin-bottom: 40px;
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

    .userActionsContainer {
      width: 75%;
    }

    .postsContainer {
      width: 70%;
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

    .userActionsContainer {
      width: 80%;

      .filterBox {
        width: 200px;
        font-size: 14px;
        height: 30px;
      }

      button {
        width: 120px;
        font-size: 14px;
      }
    }

    .postsContainer {
      width: 80%;
    }
  }
}
</style>