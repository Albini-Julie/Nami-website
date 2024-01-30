<template>
  <div class="infos">
    <!--Capital-->
    <div class="infos__bloc">
      <img
        class="infos__img --mobile"
        src="/drapeau_italie.jpg"
        alt="image du drapeau du pays"
      />
      <!--Les informations-->
      <div class="infos__BigContent">
        <div class="infos__content">
          <div class="infos__blocIcons">
            <IconsPing class="infos__icons" :color="colorText" />
          </div>
          <p class="infos__text">{{ capitale }}</p>
        </div>
        <div class="infos__content">
          <div class="infos__blocIcons">
            <IconsDistance class="infos__icons --distance" :color="colorText" />
          </div>
          <p class="infos__text">{{ superficie }}</p>
        </div>
        <div class="infos__content">
          <div class="infos__blocIcons">
            <IconsPersonne class="infos__icons --personne" :color="colorText" />
          </div>
          <p class="infos__text">{{ pop }}</p>
        </div>
        <div class="infos__content">
          <div class="infos__blocIcons">
            <IconsParole class="infos__icons --carre" :color="colorText" />
          </div>
          <p class="infos__text">{{ langue }}</p>
        </div>
        <div class="infos__content">
          <div class="infos__blocIcons">
            <IconsPlat class="infos__icons --plat" :color="colorText" />
          </div>
          <p class="infos__text">{{ specialite }}</p>
        </div>
      </div>

      <div class="infos__imgs">
        <img
          class="infos__img --desktop"
          src="/drapeau_italie.jpg"
          alt="image du drapeau du pays"
        />
        <img
          class="infos__img --desktop"
          src="/Pizza.jpg"
          alt="image de la spécialité du pays"
        />
      </div>
      <img
        class="infos__img --mobile"
        src="/Pizza.jpg"
        alt="image de la spécialité du pays"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infos {
  @mixin only-small {
    width: 90%;
  }
  position: relative;
  margin: 0px auto;

  &__imgs {
    display: none;
    @include medium-up {
      display: flex;
      flex-direction: column;
      gap: rem(30);
    }
  }

  &__blocIcons {
    width: 60px;
    display: flex;
    justify-content: center;
  }

  &__img {
    width: rem(120);
    height: rem(80);
    @include medium-up {
      width: rem(160);
      height: rem(120);
    }

    &.--mobile {
      display: block;
      @include medium-up {
        display: none;
      }
    }

    &.--desktop {
      display: none;
      @include medium-up {
        display: block;
      }
    }
  }

  &__bloc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: 30px 10px;
    gap: rem(30);
    margin: rem(0) auto;
    width: 40vh;

    @include medium-up {
      justify-content: space-evenly;
      flex-direction: row;
      padding: 30px 40px;
      width: 60vh;
      max-width: 50vh;
    }
    @include large-up {
      width: 70vh;
      margin-top: rem(50);
      max-width: 80vh;
    }
    @include x-large-up {
      width: 60vh;
    }
  }

  &__content {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: rem(20);
    width: 100%;
    @include medium-up {
      gap: rem(30);
    }
  }

  &__BigContent {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: rem(20);
  }

  &__text {
    color: v-bind(colorText);
    font-family: $secondary-font-family;
    font-size: rem(30);
    margin: rem(0);
    @include medium-up {
      font-size: $medium-font-size;
    }
  }

  &__icons {
    width: 40px;
    height: 50px;

    @include medium-up {
      width: 46px;
      height: 60px;
    }

    &.--distance {
      width: rem(55);
      height: rem(45);
      @include medium-up {
        width: rem(65);
        height: rem(55);
      }
    }

    &.--personne {
      width: rem(65);
      height: rem(65);
      @include medium-up {
        width: rem(75);
        height: rem(75);
      }
    }

    &.--plat {
      width: rem(55);
      height: rem(40);
      @include medium-up {
        width: rem(65);
        height: rem(50);
      }
    }

    &.--carre {
      width: rem(50);
      height: rem(50);
      @include medium-up {
        width: rem(60);
        height: rem(60);
      }
    }
  }
}
.infos__bloc::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: v-bind(color);
  opacity: 0.6;
  z-index: -1; /* Placez le pseudo-élément derrière le contenu */
}
</style>

<script setup>
import { defineProps } from "vue";

defineProps({
  img_dra: String,
  img_spe: String,
  pop: String,
  superficie: String,
  capitale: String,
  specialite: String,
  langue: String,
  color: String,
  colorText: String,
});
</script>
