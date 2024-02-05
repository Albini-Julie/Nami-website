<template>
  <!--Bloc qui contient le cercle-->
  <div class="cursor-container">
    <!--Cercle qui suit la souris-->
    <div id="follow" ref="follow"></div>
  </div>
  <!--Page affichée-->
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>
// Styles bloc qui contient le cercle
.cursor-container {
  display: none;
  @include large-up {
    display: block;
    position: fixed;
    width: 25px;
    height: 25px;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
  }
}

// Styles du cercle qui suit la souris
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
// Fonction qui gère le cercle suivant la souris au mouvement
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
