<template>
  <div class="full-screen pos"></div>
  <myLogin />
</template>

<script>
import myLogin from "../components/myLogin.vue";
export default {
  name: "loginPlus",
  components: {
    myLogin,
  },
  // created(){
  //       window.onload=()=>{
  //       this.rain('pos');
  //      }
  // },
  mounted() {
    this.$nextTick(() => {
      this.rain("pos");
    });
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:black");
  },
  beforeUnmount() {
    document.querySelector("body").removeAttribute("style");
  },
  methods: {
    //雨滴效果
    rain(className) {
      var content = document.querySelector("." + className);
      let height = window.screen.width;
      let clone = content.cloneNode(true);
      for (let i = 0; i < 30; i++) {
        let rain = document.createElement("div");

        rain.setAttribute("class", "rain");
        let posNum = 0;
        let num = Math.random() * (height - 20);
        let time = Math.random() * 10;
        posNum += num;

        rain.style.cssText = `left:${posNum}px;top:${0}px;animation-delay:${time}s`;
        clone.appendChild(rain);
      }

      content.parentNode.replaceChild(clone, content);
    },
  },
};
</script>
<style>
.full-screen {
  background-color: black;
  height: 100%;
  width: 100%;
}
.pos {
  height: 100%;
  width: 100%;
  position: fixed;
}
.rain {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 60px;
  background: #17f54e;
  pointer-events: none;
  animation: drops 0.7s linear infinite;
}
@keyframes drops {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate3d(0px, 90vh, 0px); /*斜度，向下，空间感*/
  }
}
</style>