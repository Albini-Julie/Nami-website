<template>
  <div class="question">
    <div class="question__blocQuestion">
      <!--Titre-->
      <h2 class="question__title">Une petite question de culture générale ?</h2>
      <!--Question-->
      <div v-for="question in questions" :key="question._id">
        <p class="question__question">{{ question.question }}</p>
      </div>
    </div>
    <!--Proposition-->
    <div class="question__blocProps">
      <div class="question__props">
        <div
          @click="checkResponse(shuffledPropositions[0])"
          class="question__prop"
        >
          <IconsCarreau class="question__icon" :color="colorText" />
          <p class="question__propText">{{ shuffledPropositions[0] }}</p>
        </div>
        <div
          @click="checkResponse(shuffledPropositions[2])"
          class="question__prop"
        >
          <IconsCoeur class="question__icon --coeur" :color="colorText" />
          <p class="question__propText">{{ shuffledPropositions[2] }}</p>
        </div>
      </div>
      <div class="question__props">
        <div
          class="question__prop"
          @click="checkResponse(shuffledPropositions[1])"
        >
          <IconsPic class="question__icon" :color="colorText" />
          <p class="question__propText">{{ shuffledPropositions[1] }}</p>
        </div>
        <div
          @click="checkResponse(shuffledPropositions[3])"
          class="question__prop"
        >
          <IconsTrefle class="question__icon" :color="colorText" />
          <p class="question__propText">{{ shuffledPropositions[3] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineProps, ref, onMounted } from "vue";

export default {
  props: {
    color: String,
    colorText: String,
  },
  setup() {
    const questions = ref([]);
    const shuffledPropositions = ref([]);
    const userResponse = ref("");

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
        questions.value = data.quizzes;
        shuffledPropositions.value = [
          data.quizzes[0].answer,
          ...data.quizzes[0].badAnswers,
        ].sort(() => Math.random() - 0.5);
        console.log(shuffledPropositions.value);
      } catch (error) {
        console.error(error);
      }
    };

    //Gestion de la réponse
    const showAlert = (message, type) => {
      // Créer une div pour l'alerte
      const alertDiv = document.createElement("div");

      // Ajouter des styles à la div en fonction du type d'alerte (par exemple, réussite ou échec)
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

      // Supprimer la div après un certain délai (par exemple, 2 secondes)
      setTimeout(() => {
        document.body.removeChild(alertDiv);
      }, 2000);
    };

    const checkResponse = (response) => {
      const correctAnswer = questions.value[0].answer.toLowerCase();
      const userResponseLowerCase = response.toLowerCase();

      if (userResponseLowerCase === correctAnswer) {
        showAlert("Bonne réponse", "success");
      } else {
        showAlert("Mauvaise réponse", "error");
      }
    };

    onMounted(getTriviaQuestions);

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
.question {
  height: fit-content;
  width: 100%;
  background-color: v-bind(color);
  padding: 20% 0%;
  @include medium-up {
    padding: 10% 0%;
  }

  &__title {
    font-family: $primary-font-family;
    font-size: rem(60);
    font-weight: 600;
    @include large-up {
      font-size: $bigger-font-size;
      width: 70%;
    }
  }

  &__question {
    font-family: $primary-font-family;
    font-size: rem(30);
    font-weight: 500;
    @include large-up {
      font-size: $medium-font-size;
    }
    @include x-large-up {
      font-size: rem(40);
    }
  }

  &__blocQuestion {
    padding: 0% rem(10);
    @include large-up {
      padding-left: 5%;
    }
    @include x-large-up {
      padding: 0% 5%;
    }
  }

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

  &__props {
    @include only-small {
      width: 90%;
    }
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }

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

  &__propText {
    font-family: $primary-font-family;
    font-size: rem(30);
    font-weight: 500;

    @include large-up {
      width: fit-content;
      max-width: 400px;
    }
    @include x-large-up {
      max-width: 600px;
      font-size: $big-font-size;
    }
  }

  &__icon {
    width: rem(40);
    height: rem(40);
    @include large-up {
      width: rem(60);
      height: rem(60);
    }
    @include x-large-up {
      width: rem(70);
      height: rem(70);
    }

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
