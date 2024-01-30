<template>
  <div class="news">
    <!-- Titre actualité -->
    <div class="news__actualite">
      <h2>l'actu</h2>
      <h2>alité</h2>
    </div>
    <div
      class="news__bloc"
      v-for="(article, index) in news.slice(0, 3)"
      :key="index"
    >
      <h3 class="news__text">{{ article.title }}</h3>
      <Button :color="color" :colorText="colorText" :url="article.url"
        >Lire l'article</Button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 90%;

  &__actualite {
    display: block;
    font-size: $bigger-font-size;
    font-family: $primary-font-family;
    color: $secondary-color;
    text-transform: uppercase;
    font-size: rem(70);
    line-height: 50px;
    @include medium-up {
      font-size: $bigger-font-size;
      line-height: 50px;
    }
    @include large-up {
      font-size: rem(80);
      line-height: 50px;
      display: none;
    }
    @include x-large-up {
      font-size: $gianter-font-size;
      line-height: 50px;
    }
  }

  &__text {
    font-family: $primary-font-family;
    font-weight: 400;
    font-size: rem(30);
  }

  &__bloc {
    flex-direction: column;
    background-color: hsla(0, 0%, 100%, 0.6);
    padding: 20px 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: rem(10);
    width: fit-content;
    @include medium-up {
      width: 80%;
    }
    @include large-up {
      width: 80%;
      max-width: rem(950);
    }

    @include x-large-up {
      width: 100%;
      max-width: rem(950);
      flex-direction: row;
      gap: rem(50);
    }
  }
}
</style>

<script>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

export default {
  props: {
    color: String,
    colorText: String,
    chemin: String,
  },
  setup(props) {
    const news = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const apiKey = "184ad7f83e464ccb982bec4e72aa2c91";
    const baseUrl = "https://newsapi.org/v2/top-headlines";

    const getNews = async () => {
      loading.value = true;

      try {
        const response = await axios.get(
          `${baseUrl}?country=${props.chemin}&apiKey=${apiKey}`
        );
        news.value = response.data.articles;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    // Mettez à jour les actualités lorsque la propriété chemin change
    watch(
      () => props.chemin,
      () => {
        getNews();
      }
    );

    onMounted(() => {
      getNews();
    });

    return { news, loading, error };
  },
};
</script>
