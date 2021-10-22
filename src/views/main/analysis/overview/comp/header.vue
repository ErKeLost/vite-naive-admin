<template>
  <n-grid x-gap="12" item-responsive responsive="screen">
    <n-gi span="xs:24 s:24 l:6 xl:5">
      <AdnyCard class="alltitle">
        <template #title>
          <span class="title-span"> Statistics Card 🎉 </span>
        </template>
        <template #subtitle>
          <div class="subtitle-title">
            <AdnyCountTo
              textIcon="mdi mdi-instagram"
              textIconColor="#fba"
              fontSize="30px"
              color="#5e5669de"
              endValue="26520"
              risingRate="20"
            ></AdnyCountTo>
          </div>
        </template>
        <template #content>
          <div class="flex item">
            <img
              class="item-normal"
              src="https://themeselection.com/demo/materio-vuetify-vuejs-admin-template/demo-1/img/10.c8088c90.png"
              alt=""
            />
          </div>
        </template>
        <template #action>
          <AdnyIcon icon="clock-time-six" size="20" color="red"
            ><span class="span">状态</span></AdnyIcon
          >
        </template>
      </AdnyCard>
    </n-gi>
    <n-gi span="xs:24 s:24 l:6 xl:5">
      <AdnyCard class="alltitle">
        <template #title>
          <span class="title-span">Sessions 🎉 </span>
        </template>
        <template #subtitle>
          <div class="subtitle-title">
            <AdnyCountTo
              textIcon="mdi mdi-github"
              fontSize="30px"
              color="#5e5669de"
              endValue="56520"
              declineRate="56"
            ></AdnyCountTo>
          </div>
        </template>
        <template #content>
          <div class="flex item">
            <img
              class="item-size"
              src="https://themeselection.com/demo/materio-vuetify-vuejs-admin-template/demo-1/img/9.249c7d38.png"
              alt=""
            />
          </div>
        </template>
        <template #action>
          <AdnyIcon icon="check-circle" size="20" color="#5e5"
            ><span class="span">状态</span></AdnyIcon
          >
        </template>
      </AdnyCard>
    </n-gi>
    <n-gi span="xs:24 s:24 l:12 xl:14">
      <AdnyCard class="alltitle">
        <!-- <img src="https://w.wallhaven.cc/full/z8/wallhaven-z8dp1v.jpg" alt="" /> -->
        <template #title>
          <span class="title-span"> Congratulations Erkelost! 🎉 </span>
        </template>
        <template #subtitle>
          <div class="subtitle-title">
            <span>
              You have done <strong>100%</strong> 🤩 task is completed today. Check your new raising
              badge in your profile.
            </span>
          </div>
        </template>
        <template #content>
          <div class="flex pic">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
            <img
              src="https://themeselection.com/demo/materio-vuetify-vuejs-admin-template/demo-3/img/pose-2.101674bc.png"
              alt=""
            />
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
        </template>
        <template #action>
          <n-button type="primary">查看任务</n-button>
        </template>
      </AdnyCard>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDesignSettingStore } from '@/store/modules/designSetting'
const designStore = useDesignSettingStore()
const color = computed(() => designStore.appTheme)
</script>

<style scoped lang="less">
.alltitle {
  position: relative;
  height: 190px;
  margin-bottom: 20px;
}
.title-span {
  font-size: 1.2rem !important;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem !important;
  color: rgba(94, 86, 105, 0.87) !important;
}
.subtitle-title {
  width: 60%;
}
.span {
  font-size: 15px;
  padding: 0 5px 0 10px;
}
.item {
  .item-size {
    width: 130px;
  }
  .item-normal {
    width: 100px;
  }
  img {
    position: absolute;
    bottom: 0;
    right: 5%;
  }
}
.pic {
  width: 50%;
  position: absolute;
  bottom: 0;
  right: 0;

  img {
    // width: 120px;
    object-fit: cover;
    &:nth-child(1) {
      width: 180px;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    &:nth-child(2) {
      position: absolute;
      left: 40%;
      bottom: 0;
      width: 130px;
    }
    &:nth-child(3) {
      position: absolute;
      left: 60%;
      bottom: 80%;
      width: 180px;
    }
  }
}
.action-span {
  padding: 2px 5px;
  background: v-bind(color);
  color: rgb(100, 100, 100);
  font-size: 13px;
  border-radius: 30px;
}
</style>
