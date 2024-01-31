<template>
  <div class="cursor-container">
    <div id="follow" ref="follow"></div>
  </div>
  <div>
    <NuxtPage />
  </div>
</template>

<style scoped>
.cursor-container {
  position: fixed;
  width: 25px;
  height: 25px;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
}
#follow {
  position: absolute;
  width: 25px;
  height: 25px;
  border: 5px solid white;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: 0.1s;
}
</style>

<script>
export default {
  mounted() {
    var cursor = document.getElementById("follow");

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
    });
  },
};
</script>
