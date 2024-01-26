<template>
  <div class="introduction">
    <img class="introduction__img" src="/ciel-degage.jpg" />
    <h1 class="introduction__title">Le site qui vous ouvre</h1>
    <h1 class="introduction__title --monde">au monde</h1>
  </div>
</template>

<style lang="scss" scoped>
.introduction {
  &__img {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  &__title {
    position: relative;
    color: $secondary-color;
    font-size: rem(50);
    font-family: $tertiary-font-family;
    margin: 0px;
    padding-top: 10%;
    padding-left: 15px;
    padding-right: 15px;
    @include medium-up {
      font-size: rem(80);
      padding-left: 5%;
      padding-right: 0px;
    }
    @include large-up {
      font-size: rem(90);
      padding-left: 5%;
      padding-right: 0px;
    }
    @include x-large-up {
      font-size: $giant-font-size;
      padding-left: 5%;
      padding-right: 0px;
    }

    &.--monde {
      text-transform: uppercase;
      color: v-bind(primaryColor);
      padding-top: 0px;
      font-size: rem(70);
      @include medium-up {
        font-size: rem(120);
      }
      @include large-up {
        font-size: rem(120);
      }
      @include x-large-up {
        font-size: $giant-font-size;
      }
    }
  }
}
</style>

<script setup>
defineProps({
  primaryColor: String,
  secondaryColor: String,
  primaryColorText: String,
  secondaryColorText: String,
});
</script>
