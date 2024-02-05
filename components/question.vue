<template>
  <!--Bloc contenant le contenu question-->
  <div class="question">
    <!--Bloc titre + question-->
    <div class="question__blocQuestion">
      <!--Titre-->
      <h2 class="question__title">Une petite question de culture générale ?</h2>
      <!--Question-->
      <div v-for="question in questions" :key="question._id">
        <p class="question__question">{{ question.question }}</p>
      </div>
    </div>
    <!--Propositions-->
    <div class="question__blocProps">
      <!--Bloc contenant les deux premières propositions-->
      <div class="question__props">
        <!--Première proposition-->
        <div
          @click="checkResponse(shuffledPropositions[0])"
          class="question__prop"
        >
          <!--Icon Carreau-->
          <IconsCarreau class="question__icon" :color="colorText" />
          <!--Texte première proposition-->
          <p class="question__propText">{{ shuffledPropositions[0] }}</p>
        </div>
        <!--Dexuième proposition-->
        <div
          @click="checkResponse(shuffledPropositions[2])"
          class="question__prop"
        >
          <!--Icon coeur-->
          <IconsCoeur class="question__icon --coeur" :color="colorText" />
          <!--Texte deuxième proposition-->
          <p class="question__propText">{{ shuffledPropositions[2] }}</p>
        </div>
      </div>
      <!--Bloc contenant les deux dernières propositions-->
      <div class="question__props">
        <!--Troisième proposition-->
        <div
          class="question__prop"
          @click="checkResponse(shuffledPropositions[1])"
        >
          <!--Icon Pic-->
          <IconsPic class="question__icon" :color="colorText" />
          <!--Texte troisième proposition-->
          <p class="question__propText">{{ shuffledPropositions[1] }}</p>
        </div>
        <!--Quatrième proposition-->
        <div
          @click="checkResponse(shuffledPropositions[3])"
          class="question__prop"
        >
          <!--Icon trefle-->
          <IconsTrefle class="question__icon" :color="colorText" />
          <!--Texte quatrième proposition-->
          <p class="question__propText">{{ shuffledPropositions[3] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importation des outils utiles
import { defineProps, ref, onMounted } from "vue";

// Création des props
// color contient le code hexadécimal de la couleur à utiliser pour le contenu
// colorText contient le code hexadécimal de la couleur à utiliser pour le texte
export default {
  props: {
    color: String,
    colorText: String,
  },

  setup() {
    // Création des varaibles
    // questions est un tableau qui contient la question
    const questions = ref([]);
    // shuffledPropositions est un tableau qui contient les différentes propositions
    const shuffledPropositions = ref([]);
    //userResponse est une chaine de caractère qui contient la réponse de l'utilisateur
    const userResponse = ref("");

    // Cette fonction va faire une requête à l'API quizzapi pour obtenir une question et les différentes réponses possibles
    const getTriviaQuestions = async () => {
      try {
        const response = await fetch(
          "https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=1&category=culture_generale&difficulty=normal"
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // On range la question dans la ref questions
        questions.value = data.quizzes;
        // On range les possibilités dans la ref shuffledPropositions et on les range dans un ordre aléatoire
        shuffledPropositions.value = [
          data.quizzes[0].answer,
          ...data.quizzes[0].badAnswers,
        ].sort(() => Math.random() - 0.5);
      } catch (error) {
        console.error(error);
      }
    };

    //Gestion de la réponse
    const showAlert = (message, type) => {
      // Créer une div pour l'alerte
      const alertDiv = document.createElement("div");

      // Ajouter des styles à la div en fonction du type d'alerte (réussite ou échec)
      alertDiv.style.position = "fixed";
      alertDiv.style.top = "50%";
      alertDiv.style.left = "50%";
      alertDiv.style.transform = "translate(-50%, -50%)";
      alertDiv.style.padding = "20px";
      alertDiv.style.borderRadius = "10px";
      alertDiv.style.color = "white";
      alertDiv.style.fontFamily = "Montserrat";
      alertDiv.style.zIndex = "10000";
      alertDiv.style.fontSize = "20px";

      if (type === "success") {
        alertDiv.style.backgroundColor = "#32CD32";
        getTriviaQuestions();
      } else if (type === "error") {
        alertDiv.style.backgroundColor = "red";
      } else {
        alertDiv.style.backgroundColor = "blue"; // Couleur par défaut pour d'autres types
      }

      // Ajouter le message à la div
      alertDiv.innerHTML = message;

      // Ajouter la div au corps du document
      document.body.appendChild(alertDiv);

      // Supprimer la div après un certain délai
      setTimeout(() => {
        document.body.removeChild(alertDiv);
      }, 2000);
    };

    // Vérifier la réponse
    const checkResponse = (response) => {
      // correctAnswer contient la valeur attendue par la question en petits caractères
      const correctAnswer = questions.value[0].answer.toLowerCase();
      // userResponseLowerCase contient la réponse entrée l'utilisateur en petits caractères
      const userResponseLowerCase = response.toLowerCase();

      // On compare les deux : si elles sont pareilles on affiche l'alert bonne réponse grâce à la fonction showAlert
      if (userResponseLowerCase === correctAnswer) {
        showAlert("Bonne réponse", "success");
      }
      // On compare les deux : si elles sont différentes on affiche l'alert avec mauvaise réponse grâce à la fonction showAlert
      else {
        showAlert("Mauvaise réponse", "error");
      }
    };

    // Au montage du composant on lance la fonction getTriviaQuestions pour obtenir la question et les propositions
    onMounted(getTriviaQuestions);

    // On récupère les variables pour les utiliser dans le template
    return {
      questions,
      shuffledPropositions,
      userResponse,
      checkResponse,
    };
  },
};
</script>

<style lang="scss" scoped>
// Styles du bloc principal
.question {
  height: fit-content;
  width: 100%;
  background-color: v-bind(color);
  padding: 20% 0%;
  @include medium-up {
    padding: 10% 0%;
  }

  // Styles du titre
  &__title {
    font-family: $primary-font-family;
    font-size: rem(60);
    font-weight: 600;
    color: v-bind(colorText);
    @include large-up {
      font-size: $bigger-font-size;
      width: 70%;
    }
  }

  // Styles de la question
  &__question {
    font-family: $primary-font-family;
    font-size: rem(30);
    font-weight: 500;
    color: v-bind(colorText);
    @include large-up {
      font-size: $medium-font-size;
    }
    @include x-large-up {
      font-size: rem(40);
    }
  }

  // Styles du bloc contenant le titre et la question
  &__blocQuestion {
    padding: 0% rem(10);
    @include large-up {
      padding-left: 5%;
    }
    @include x-large-up {
      padding: 0% 5%;
    }
  }

  // Styles bloc contenant toutes les propositions
  &__blocProps {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: start;
    padding: 0px 20px;
    @include medium-up {
      padding: 0px 50px;
    }

    @include large-up {
      flex-direction: row;
      margin-top: 5%;
      padding: 0px 0px;
    }
  }

  // Styles bloc contenant deux propositions
  &__props {
    @include only-small {
      width: 90%;
    }
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    color: v-bind(colorText);
  }

  // Styles bloc contenant une proposition
  &__prop {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: rem(30);
    cursor: pointer;

    @include large-up {
      height: 150px;
    }
  }

  // Styles des textes des propositions
  &__propText {
    font-family: $primary-font-family;
    font-size: rem(30);
    font-weight: 500;
    width: fit-content;

    @include large-up {
      width: fit-content;
      max-width: 400px;
    }
    @include x-large-up {
      max-width: 600px;
      font-size: $big-font-size;
    }
  }

  // Styles des icons
  &__icon {
    width: rem(40);
    height: rem(40);
    min-width: rem(40);
    @include large-up {
      width: rem(60);
      height: rem(60);
    }
    @include x-large-up {
      width: rem(70);
      height: rem(70);
    }

    // Styles icon coeur
    &.--coeur {
      width: rem(40);
      height: rem(35);
      @include large-up {
        width: rem(60);
        height: rem(50);
      }
      @include x-large-up {
        width: rem(70);
        height: rem(60);
      }
    }
  }
}
</style>
