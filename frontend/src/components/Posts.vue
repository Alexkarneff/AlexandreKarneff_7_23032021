<template>
  <div class="postContainer">
    <div class="postHeader">
      <div class="leftSideHeader">
        <div class="authorAndDate">
          <p>{{ authorFirstName }} {{ authorLastName }}</p>
          <p>le {{ formattedPublicationDate }}</p>
        </div>
      </div>

      <div class="rightSideHeader" v-show="authorIsUser || $store.state.user.admin">
        <button class="button" @click="deleteAPost">Supprimer</button>
      </div>
    </div>

    <div class="postContent">
      <p class="postContent__title">{{ postTitle }}</p>
      <p class="postContent__text">{{ postText }}</p>
      <div class="postContent__image" v-show="postHasImage">
        <img alt="posted image" :src="imageURL" />
      </div>
    </div>

    <div class="postNumbers">
      <p>{{ comments.length }} Commentaires</p>
    </div>

    <div class="postActionsContainer">
      <div class="commentContainer">
        <a @click.prevent="triggerWritingComment" title="Ajouter un commentaire !">
         <strong> <p>Commenter</p> </strong>
        </a>
      </div>
    </div>

    <div v-show="writingComment" class="commentInputContainer">
      <input
        ref="firstField"
        type="text"
        placeholder="Écrire un commentaire "
        v-model="commentText"
      />

      <a @click.prevent ="commentAPost"> 
        <button> Envoyer ! 
        </button>
        </a>
    </div>

    <div v-show="comments.length > 0" v-for="comment in comments" :key="comment.id">
      <Comment
        :authorFirstName="comment.User.firstName"
        :authorLastName="comment.User.lastName"
        :authorId="comment.userId"
        :commentId="comment.id"
        :commentText="comment.content"
        @deleteComment="deleteAComment"
      >
      </Comment>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Comment from "../components/Comment.vue";
import { useStore } from "vuex";
import { ref, onUpdated } from "vue";

export default {
  components: { Comment },
  name: "Post",
  props: {
    postId: Number,
    authorId: Number,
    authorFirstName: String,
    authorLastName: String,
    imageURL: String,
    publicationDate: String,
    postTitle: String,
    postText: String,
    comments: Array,
  },
  emits: ["deletePost", "commentPost", "deleteComment"],
  setup(props, context) {
    // Données et variables
    const store = useStore();
    const formattedPublicationDate = moment(props.publicationDate).format("DD/MM/YYYY");
    let authorIsUser = ref(false);
    let writingComment = ref(false);
    let commentText = ref("");
    const firstField = ref(null);
    const postHasImage = ref(false);

    if (props.imageURL != null) {
      postHasImage.value = true;
    }
    // Focus de la souris sur le 1er champ texte
    onUpdated(() => {
      firstField.value.focus();
    });

    // bouton Supprimer un post
    if (props.authorId === store.state.user.id) {
      authorIsUser.value = true;
    }

    // Suppression d'un post
    function deleteAPost() {
      const id = props.postId;
      context.emit("deletePost", id);
    }

    // Afficher sous le post l'input pour écrire un commentaire
    function triggerWritingComment() {
      if (writingComment.value === false) {
        writingComment.value = true;
      } else {
        writingComment.value = false;
      }
    }

    // Écrire un commentaire
    function commentAPost() {
      const postId = props.postId;
      const commentData = {
        postId: postId,
        content: commentText.value,
        userId: store.state.user.id,
      };
      context.emit("commentPost", commentData);
      writingComment.value = false;
    }

    // Supprimer un commentaire
    function deleteAComment(id) {
      context.emit("deleteComment", id);
    }

    return {
      formattedPublicationDate,
      authorIsUser,
      triggerWritingComment,
      writingComment,
      commentAPost,
      commentText,
      deleteAComment,
      deleteAPost,
      firstField,
      postHasImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.postContainer {
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
  background-color: white;
}

.postHeader {
  padding: 5px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .leftSideHeader {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .authorAndDate {
      p {
        margin: 0;
        font-size: 14px;
      }
      p:last-child {
        letter-spacing: 1px;
      }
    }
  }

  .rightSideHeader {
    button {
      border-radius: 5px;
      color: white;
      height: 35px;
      z-index: 1;
      cursor: pointer;
      border: none;
      font-weight: bold;
      background-color: rgba(0, 0, 0, 0.5);
      box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
    }
  }
}

.postContent {
  padding: 0 10px;
  margin: 20px auto 30px;

  &__title {
    font-weight: bold;
    margin-top: 0;
  }

  &__text {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    // border: 1px black solid;
  }

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    height: auto;
    // border: 1px black solid;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // border: 1px red dashed;
    }
  }
}

.postActionsContainer,
.postNumbers {
  padding-top: 10px;
  width: 100%;
  margin: 0 auto;
  height: 45px;
  border-top: 1px solid grey;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .commentContainer a {
    display: flex;
    align-items: center;
    margin: 0 20px;

    p {
      display: inline-block;
      margin: 0;
    }
    .icon-action {
      margin-right: 5px;
    }

    &:hover {
      color: #ab1f03;
      cursor: pointer;
    }
  }
}
.postNumbers {
  justify-content: space-between;
  p {
    margin: 0 10px;
    .icon {
      margin-right: 8px;
    }
  }
}
.orange {
  color: #ab1f03;
}

.commentInputContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  // border: 1px solid green;

  .userPicContainer {
    width: 35px;
    height: 35px;
    margin: 0;
    border-radius: 50%;
    // border: 1px red dashed;
  }
      button {
      border-radius: 5px;
      color: white;
      height: 35px;
      z-index: 1;
      cursor: pointer;
      border: none;
      font-weight: bold;
      background-color: rgba(0, 0, 0, 0.5);
      box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
    }

  input {
    width: 85%;
    height: 35px;
    margin-left: 5px;
    background-color: rgba(142, 163, 158, 0.32);
    font-size: 13px;
    border-radius: 20px;
    border: none;
    outline: none;
    padding-left: 10px;

  }
}

@media screen and (max-width: 599px) {

			.rightSideHeader {

        button {
        margin-left: 10px;
				font-size: 10px;
				width: 60px;
				padding: 0;
			}}
	}
</style>