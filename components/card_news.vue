<!--Intégation de la card news-->
<template>
  <!--Bloc contenant les actualités et le titre-->
  <div class="news">
    <!-- Titre actualité -->
    <div class="news__actualite">
      <h2>l'actu</h2>
      <h2>alité</h2>
    </div>
    <!--Bloc contenant une actualité-->
    <div
      class="news__bloc"
      v-for="(article, index) in news.slice(0, 3)"
      :key="index"
    >
      <!--Titre de l'actualité-->
      <h3 class="news__text">{{ article.title }}</h3>
      <!--Bouton vers l'actualité-->
      <Button :color="color" :colorText="colorText" :url="article.url"
        >Lire l'article</Button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Styles du bloc général
.news {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 90%;

  // Styles du bloc actualité (titre)
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

  // Styles des textes
  &__text {
    font-family: $primary-font-family;
    font-weight: 400;
    font-size: rem(30);
  }

  // Styles du bloc contenant l'actualité
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
      justify-content: space-between;
    }
  }
}
</style>

<script>
// Importations des outils utiles
import { ref, onMounted, watch } from "vue";
import axios from "axios";

// Création des props
// color contient la couleur à utiliser pour le contenu
// colorText contient la couleur à utiliser pour les textes
// chemin contient la valeur à mettre dans la requête des news de chaque pays
export default {
  props: {
    color: String,
    colorText: String,
    chemin: String,
  },
  setup(props) {
    // Création des refs utiles
    // news est un tableau qui contient toutes les news du pays
    // loading peut permettre une temporisation qui n'est pas mise en place ici
    // error contient le texte d'une éventulle erreur
    const news = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const apiKey = "184ad7f83e464ccb982bec4e72aa2c91";
    const baseUrl = "https://newsapi.org/v2/top-headlines";

    // Fonction du récupère les news du pays
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

    // Au montage du composant appel de la fonction getNews pour obtenir les news du pays
    onMounted(() => {
      getNews();
    });

    // Récupération des variables pour les utiliser dans le template
    return { news, loading, error };
  },
};
</script>
