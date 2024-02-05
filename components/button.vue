<!--Intégration du bouton-->
<template>
  <!--Lien du bouton-->
  <a :href="url" target="_blank">
    <!--Bouton-->
    <button class="button"><slot></slot></button
  ></a>
</template>

<script>
// Création des props color pour la couleur du bouton
// de colorText pour la couleur du texte du bouton
// de url pour le lien vers lequel renvoie le bouton
export default {
  props: {
    color: String,
    colorText: String,
    url: String,
  },
};
</script>

<!--Styles du bouton-->
<style lang="scss" scoped>
// Styles généraux du bouton
.button {
  background-color: v-bind(color);
  color: v-bind(colorText);
  cursor: pointer;
  width: fit-content;

  border: none;
  border-radius: rem(50);
  font-family: $primary-font-family;
  padding: 20px 40px;
  font-size: rem(20);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline: 1px solid;
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 0px;
  text-shadow: none;
  -webkit-transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  outline-color: v-bind(color);
  outline-offset: 0px;
  @include large-up {
    font-size: rem(25);
    min-width: rem(237);
    min-height: rem(75);
  }

  // Styles du bouton au hover
  &:hover {
    background-color: v-bind(colorText);
    color: v-bind(color);
    border: 2px solid;
    border-color: v-bind(color);
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    outline-offset: 15px;
    outline-color: rgba(255, 255, 255, 0);
  }
}
</style>
