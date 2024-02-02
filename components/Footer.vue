<template>
  <div class="footer">
    <div class="footer__content">
      <NuxtLink class="footer__text" :to="lien">
        <p
          @mouseover="onMouseOver"
          @mouseout="onMouseOut"
          class="footer__text --hover"
        >
          {{ titre }}
        </p>

        <div>
          <span class="footer__hover" v-if="test && message">
            Pensez à rafraîchir la page !
          </span>
        </div>
      </NuxtLink>
    </div>

    <h4 class="footer__text --copy">
      Site réalisé dans le cadre d’un projet étudiant MMI par Julie Albini
    </h4>
  </div>
</template>

<style lang="scss" scoped>
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

  &__content {
    display: flex;
    align-items: center;
  }

  &__text {
    font-family: $primary-font-family;
    $regular-font-size: rem(20);
    color: $secondary-color;
    font-weight: 500;
    text-decoration: none;

    &.--hover {
      display: flex;
      justify-content: center;
    }

    /* Ajout de la marge autour de l'élément */

    &.--copy {
      width: 80%;
      font-weight: 200;
      text-align: center;
      @include medium-up {
        width: fit-content;
      }
    }
  }

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
export default {
  props: {
    titre: String,
    lien: String,
    message: Boolean,
  },
  data() {
    return {
      test: false,
    };
  },
  methods: {
    onMouseOver() {
      this.test = true;
    },
    onMouseOut() {
      this.test = false;
    },
  },
};
</script>
