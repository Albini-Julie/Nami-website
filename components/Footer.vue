<template>
  <div class="footer">
    <NuxtLink
      class="footer__text"
      :to="lien"
      :title="hover ? messageAuHover : ''"
      ><p class="e-footer__text">{{ titre }}</p></NuxtLink
    >

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

  &__text {
    font-family: $primary-font-family;
    $regular-font-size: rem(20);
    color: $secondary-color;
    font-weight: 500;
    text-decoration: none;
    margin: 0;

    &.--copy {
      width: 80%;
      font-weight: 200;
      text-align: center;
      @include medium-up {
        width: fit-content;
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    titre: String,
    lien: String,
    hover: Boolean,
  },
  data() {
    return {
      messageAuHover: "Pensez à rafraichir la page principale !",
    };
  },
};
</script>
