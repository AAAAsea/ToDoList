<template>
  <div class="topnav">
    <!-- 设置 -->
    <div class="settings" @click="store.state.model.settingsModelFlag = !store.state.model.settingsModelFlag">
      <el-icon><Setting /></el-icon>
    </div>
    <div class="left">
      <!-- 账户 -->
      <span class="header baseline" @click="openLoginModel" v-if="!store.state.user.isLogin">
        登录
      </span>
      <el-popconfirm title="退出登录？" @confirm="emit('logout')" v-else>
        <template #reference>
          <span class="header baseline">
            {{store.state.user.nickName}}
          </span>
        </template>
      </el-popconfirm>
      <!-- 更新记录 -->
      <span class="history" @click="openHisory">
        <el-icon><Clock /></el-icon>
      </span>
    </div>
  </div>
</template>

<script setup>
import { Clock, Setting } from '@element-plus/icons-vue'
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';



const emit = defineEmits(['logout']);
const store = useStore();


// 登录登出
function openLoginModel(){
  if(!store.state.user.isLogin){
    store.state.model.loginModelFlag = !store.state.model.loginModelFlag
  }
}


function openHisory(){
  store.commit('updateModel',{key: 'historyModelFlag', value: true})
}
</script>

<style scoped lang="scss">
  .topnav{
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 20;
    background: radial-gradient(transparent 1px,var(--bg-transparant-color) 1px);
    backdrop-filter: saturate(100%)  blur(10px);
    height: 50px;
  }
  .settings{
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 1.2em;
  }
  .left{
    position: absolute;
    left: 20px;
    top: 12px;
    display: flex;
    gap: 10px;
  }
  .header{
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
  }
  .history, .settings{
    font-size: 25px;
    transition: transform .3s;
    cursor: pointer;;
    .el-icon{
      transition: .3s;
    }
    .el-icon:hover{
      transform: rotate(180deg);
    }
  }
  .baseline::after{
    content: '';
    display: block;
    height: 2px;
    width: 0%;
    margin-top: 3px;
    background: var(--font-color);
    transition: .3s;
  }
  .baseline:hover::after{
    width: 100%;
  }
</style>