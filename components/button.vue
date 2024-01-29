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
  width: fit-content;
  background-color: v-bind(color);
  border: none;
  border-radius: rem(50);
  font-family: $primary-font-family;
  color: v-bind(colorText);
  padding: 20px 40px;
  font-size: rem(20);
  @include large-up {
    font-size: rem(30);
  }

  &:hover {
    background-color: v-bind(colorText);
    color: v-bind(color);
    border: solid;
    border-width: 2px;
    border-color: v-bind(color);
  }
}
</style>
