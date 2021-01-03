<template>
    <div class='post'>
        <div class="headerImg" :style="{ 'background-image':'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(' + post.imgUrl.stringValue + ')' }">      

            <h1 id='title'>{{ post.title.stringValue }}</h1>
            <h3 id='desc'>{{ post.desc.stringValue }}</h3>
        </div>
        <div class='postContent'>
            <div v-html="post.content.stringValue"></div>
        </div>
        <nuxt-link to="/blogi">
            <v-btn color='blue lighten-1' style='color: #fff' fab fixed left bottom>
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            </nuxt-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Post',

data: () => {
    return {
      game: null,
      price: Math.floor(Math.random() * 50 + 9),
      quantity: 1,
    };
  },

//   async asyncData({ params }) {
//     return axios
//       .get(`https://firestore.googleapis.com/v1/projects/vuokraapaku-c6c89/databases/(default)/documents/posts/${params.id}`)
//       .then((res) => {
//         return { post: res.data.fields };
//         console.log(res.data.fields);
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   },
}
</script>

<style scoped>
    .postContent {
        padding: 5% 18% 5% 18%;
    }
    #title {
        font-size: 40px;
    }
    #desc {
        font-weight: 100;
    }
    @media only screen and (max-width: 960px) {
        .postContent {
            padding: 5% 8% 5% 8%;
        }
    }
    @media only screen and (max-width: 600px) {
        #title {
            font-size: 28px;
        }
        #desc {
            font-weight: 100;
        }
    }

    .headerImg {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        padding: 12% 8% 12% 8%;
        color: #fff;
        text-align: center;
    }
</style>