<template>
  <div class="container-number-animation">
    <div class="container-counter-card">
      <div class="counter-card-header">
        <span class="counter-title">{{ title }}</span>
      </div>
      <div class="counter-card">
        <span :style="{ color, fontSize }" :class="[size]">{{ animationCounterFixed }}</span>
        <span
          :style="{ color, fontSize, paddingLeft: '10px' }"
          :class="[size]"
          v-if="suffix"
        >{{ suffix }}</span>
        <span class="counter-rate-class" v-if="risingRate || declineRate">
          <span style="color: #67c23a" v-if="risingRate">
            <i class="mdi mdi-arrow-up"></i>
            <span>{{ `${risingRate}%` }}</span>
          </span>
          <span style="color: #f56c6c" v-if="declineRate">
            <i class="mdi mdi-arrow-down"></i>
            <span>{{ `${declineRate}%` }}</span>
          </span>
        </span>
        <i
          v-if="countIcon"
          :class="[`mdi mdi-${countIcon}`]"
          :style="{ color: iconColor, fontSize: size }"
          class="iconFont"
        ></i>
      </div>
    </div>
    <div>
      <i :style="{ color: textIconColor }" class="textIcon" v-if="textIcon" :class="textIcon"></i>
      <span class="container-text-class">{{ text }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import gsap from 'gsap'
const props = {
  suffix: { type: String },
  title: { type: String },
  startValue: { type: String, default: '0' },
  endValue: { type: String, default: '0' },
  duration: { type: String, default: '3' },
  autoplay: { type: Boolean, default: true },
  color: { type: String },
  iconColor: { type: String },
  size: { type: String, default: '' },
  fontSize: { type: String },
  useEasing: { type: Boolean, default: false },
  transition: { type: String, default: '' },
  countIcon: { type: String, default: '' },
  fixNumber: { type: Number, default: 2 },
  text: { type: String, default: '' },
  textIcon: { type: String, default: '' },
  textIconColor: { type: String, default: '' },
  risingRate: { type: String },
  declineRate: { type: String }
}
export default defineComponent({
  name: 'AdnyCountTo',
  props,
  data() {
    return {
      animationCounter: this.startValue
    }
  },
  computed: {
    animationCounterFixed(): any {
      return Number(this.animationCounter).toFixed(this.fixNumber)
    }
  },
  watch: {
    endValue: {
      handler(newValue) {
        if (this.autoplay) {
          gsap.to(this, {
            duration: this.duration,
            animationCounter: newValue,
            ease: this.useEasing ? this.transition : '',
            // delay: 3,
            onStart: () => {
              // console.log('动画开始了')
              this.$emit('onStart')
            },
            onComplete: () => {
              // console.log('动画结束了')
              this.$emit('onComplate')
            }
          })
        }
      },
      immediate: true
    }
  }
})
</script>

<style lang="less" scoped>
.container-number-animation {
  user-select: none;
}
.container-text-class {
  color: rgba(94, 86, 105, 0.87) !important;
  font-weight: bold;
}
.textIcon {
  font-size: 20px;
  padding: 10px 13px;
  border-radius: 50%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.container-number-animation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .iconFont {
    margin-left: 10px;
    // color: #fba;
  }
  .normal {
    font-size: 25px;
    font-weight: bold;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .small {
    font-size: 20px;
    font-weight: bold;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .large {
    font-size: 35px;
    font-weight: bold;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
}
.container-counter-card {
  // padding: 20px;
}
.counter-title {
  font-family: "open sans", Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: #8c8c8c;
  font-size: 14px;
}
.counter-card-header {
  margin-bottom: 10px;
}
.counter-rate-class {
  margin-left: 10px;
}
.counter-card {
  display: flex;
  align-items: center;
}
</style>
