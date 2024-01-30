<template>
  <button class="button"><slot></slot></button>
</template>

<script>
export default {
  props: {
    color: String,
    colorText: String,
  },
};
</script>

<style lang="scss" scoped>
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
  outline-color: rgba(255, 255, 255, 0.5);
  outline-offset: 0px;
  @include large-up {
    font-size: rem(30);
  }

  &:hover {
    background-color: v-bind(colorText);
    color: v-bind(color);
    border: 1px solid;
    border-color: v-bind(color);
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    outline-offset: 15px;
    outline-color: rgba(255, 255, 255, 0);
    text-shadow: 1px 1px 2px #427388;
  }
}
</style>
