<template>
  <div class="introduction">
    <h1 class="introduction__title">Le site qui vous ouvre</h1>
    <h1 class="introduction__title --monde">au monde</h1>
    <div class="introduction__icon">
      <IconsFleche id="scrollButton" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.introduction {
  margin: 0; /* Ajustez les marges selon vos besoins */
  padding: 0; /* Ajustez les rembourrages selon vos besoins */
  height: 110vh; /* 100% de la hauteur de la fenêtre visible */
  overflow: hidden; /* Pour éviter tout débordement de contenu */
  position: relative;

  background-image: url("/ciel-degage.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  &__icon {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
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

document.getElementById("scrollButton").addEventListener("click", function () {
  // Sélectionnez l'élément vers lequel vous souhaitez faire défiler
  var targetElement = document.querySelector(".bottom-center-element");

  // Faites défiler la page jusqu'à l'élément
  targetElement.scrollIntoView({ behavior: "smooth" });
});
</script>
