<!--Intégration du footer-->
<template>
  <!--Bloc contenant tout le footer-->
  <div class="footer">
    <!--Bloc contenant le premier lien-->
    <div class="footer__content">
      <!--Lien vers la page d'accueil ou mentions légales-->
      <NuxtLink class="footer__text" :to="lien">
        <!--Titre du lien-->
        <p
          @mouseover="onMouseOver"
          @mouseout="onMouseOut"
          class="footer__text --hover"
        >
          {{ titre }}
        </p>

        <!--Petit message au hover indiquant la nécessité d'un rafraichissement de la page lors du retour sur la page d'accueil-->
        <div>
          <span class="footer__hover" v-if="test && message">
            Pensez à rafraîchir la page !
          </span>
        </div>
      </NuxtLink>
    </div>

    <!--Indications du projet étudiant-->
    <h4 class="footer__text --copy">
      Site réalisé dans le cadre d’un projet étudiant MMI par Julie Albini
    </h4>
  </div>
</template>

<style lang="scss" scoped>
// Styles du bloc contenant le footer
.footer {
  background-color: #000000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: rem(30) rem(0);
  gap: rem(15);
  @include medium-up {
    padding: rem(20) rem(0);
  }

  // Styles du bloc contenant le premier lien
  &__content {
    display: flex;
    align-items: center;
  }

  // Styles des textes
  &__text {
    font-family: $primary-font-family;
    $regular-font-size: rem(20);
    color: $secondary-color;
    font-weight: 500;
    text-decoration: none;

    // Styles du premier lien au hover
    &.--hover {
      display: flex;
      justify-content: center;
    }

    // Styles de l'indication projet étudiant
    &.--copy {
      width: 80%;
      font-weight: 200;
      text-align: center;
      @include medium-up {
        width: fit-content;
      }
    }
  }

  // Styles du message hover
  &__hover {
    color: white;
    background-color: red;
    padding: rem(10);
    border-radius: rem(10);
    font-family: $primary-font-family;
  }
}
</style>

<script>
// Création des props
// titre contenant le titre du premier lien
// lien contenant le lien du premier lien
// message indiquant s'il faut afficher ou non le petit message hover
export default {
  props: {
    titre: String,
    lien: String,
    message: Boolean,
  },
  data() {
    // Création d'une variable permettant de savoir si la souris est sur le premier lien
    return {
      test: false,
    };
  },
  methods: {
    // lorsque la souris est sur le premier lien test = true
    onMouseOver() {
      this.test = true;
    },
    // lorsque la souris quitte le premier lien test = false
    onMouseOut() {
      this.test = false;
    },
  },
};
</script>
