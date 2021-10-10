<template>
<!-- eslint-disable  -->
  <div class="home">

    <h2>Créez votre post ici !</h2>
    <div class="formCreate">
      <Createpost/>
    </div>
  </div>
</template>

<script>
import Createpost from "@/components/Createpost.vue";

export default {
	name: "SignUp",
	components: {
		Createpost
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

div.submissionSuccess,
div.deletePostSuccess {
  height: 40px;
  background-color: #42b983;
  border: 1px solid #d6e9c6;
  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    margin: 0;
  }
}

.wallContainer {
  width: 60%;
  margin: 10px auto 40px;
  padding: 2% 0;
  // border: 1px solid black;

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

    .wallContainer {
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

    div.submissionSuccess,
    div.deletePostSuccess {
      font-size: 14px;
    }

    .wallContainer {
      width: 80%;
    }
  }
}
</style>