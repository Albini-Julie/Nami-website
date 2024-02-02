<template>
  <div class="legal">
    <div class="legal__bloc">
      <h4 class="legal__soustitre">{{ titre }}</h4>
      <div v-for="text in content">
        <p class="legal__text">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.legal {
  display: flex;
  justify-content: space-around;
  &__bloc {
    background-color: hsla(0, 0%, 100%, 0.6);
    padding: rem(15);
    display: flex;
    flex-direction: column;
    width: 80%;
    @include large-up {
    }
    @include x-large-up {
      width: 70%;
    }
  }

  &__soustitre {
    margin: 0px;
    margin-bottom: 20px;
    font-family: $secondary-font-family;
    font-weight: 400;
    font-size: rem(30);
  }

  &__text {
    margin: 0px;
    font-family: $secondary-font-family;
    font-size: rem(20);
    font-weight: 400;
  }
}
</style>

<script>
export default {
  props: {
    titre: String,
    content: Array,
  },
};
</script>
