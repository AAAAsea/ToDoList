<script setup>
  import LoginModel from '@/components/LoginModel.vue'
  import ProjectHistory from '@/components/ProjectHistory.vue'
  import TopNav from '@/components/TopNav.vue'
  import Footer from '@/components/Footer.vue'
  import MainContent from '@/components/MainContent.vue'
  import Settings from '@/components/Settings.vue'
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  import { useStore } from 'vuex'
  import { ref } from '@vue/reactivity'


  const store = useStore();

  const loginState = ref(false);
  const mainContent = ref();

  function adjustModelWidth(){
    if(window.innerWidth > 800){
      store.commit('updateModel',{key: 'modelWidth', value: '40%'});
    }else{
      store.commit('updateModel',{key: 'modelWidth', value: '95vw'});
    }
  }
  adjustModelWidth();
  window.addEventListener('resize',adjustModelWidth)
  
  function changeLoginState(state){
    loginState.value = state;
  }

  function logout(){
    changeLoginState(false);
    store.commit('updateUser',{key: 'isLogin', value: false})
    store.commit('updateUser',{key: 'token', value: ''})
    store.state.model.loginModelFlag = true;
  }
</script>

<template>

  <el-config-provider :locale="zhCn">
    <!-- 顶部导航 -->
    <TopNav @logout="logout"/>  
    <!-- 设置模块 -->
    <Settings />
    <!-- 内容区域 -->
    <MainContent :loginState="loginState" @logout="logout"/>
    <!-- 登录模块 -->
    <LoginModel @login="changeLoginState(true)"/>
    <!-- 更新模块 -->
    <ProjectHistory/>
    <!-- 底部模块 -->
    <Footer/>
  </el-config-provider>
</template>
