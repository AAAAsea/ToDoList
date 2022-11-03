<template>
    <el-dialog v-model="store.state.model.settingsModelFlag" title="设置" :width="store.state.model.modelWidth">
    <div id="settings">
      <ul>
        <li>
          <span>主题模式</span>
          <el-switch
            v-model="theme"
            inline-prompt
            :active-icon="Sunny"
            :inactive-icon="Moon"
            @change="changeTheme"
            active-value="light"
            inactive-value="dark"
            style="--el-switch-on-color: #ffaa00; --el-switch-off-color: 	#12388b"
          />
        </li>
        <li>
          <span>阴影效果</span>
          <el-switch
            v-model="shadow"
            inline-prompt
            @change="changeShadow"
            :active-value="true"
            :inactive-value="false"
            style="--el-switch-on-color: #ffaa00; --el-switch-off-color: #444444"
          />
        </li>
        <li>
          <span>完成任务自动折叠</span>
          <el-switch
            v-model="autoFold"
            inline-prompt
            @change="changeFold"
            :active-value="true"
            :inactive-value="false"
            style="--el-switch-on-color: #ffaa00; --el-switch-off-color: #444444"
          />
        </li>
        <li>
          <span>完成任务隐藏当天日期</span>
          <el-switch
            v-model="autoHide"
            inline-prompt
            @change="changeHide"
            :active-value="true"
            :inactive-value="false"
            style="--el-switch-on-color: #ffaa00; --el-switch-off-color: #444444"
          />
        </li>
        <li>
          <span>待办输入框固定在顶部</span>
          <el-switch
            v-model="topSticky"
            inline-prompt
            @change="changeSticky"
            :active-value="true"
            :inactive-value="false"
            style="--el-switch-on-color: #ffaa00; --el-switch-off-color: #444444"
          />
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ref } from "@vue/reactivity";


const store = useStore();

// 主题
const theme = ref(store.state.settings.theme);
function changeTheme(theme){
  store.commit('updateSettings',{key: 'theme', value: theme})
  document.documentElement.className = theme;
}
changeTheme(theme.value);

// 阴影
const shadow = ref(store.state.settings.shadow);
const changeShadow = state=>{store.commit('updateSettings',{key: 'shadow', value: state})}

// 折叠
const autoFold = ref(store.state.settings.autoFold)
const changeFold = state => {store.commit('updateSettings',{key: 'autoFold', value: state})}

// 吸顶
const topSticky = ref(store.state.settings.topSticky)
const changeSticky = state => {store.commit('updateSettings',{key: 'topSticky', value: state})}

// 隐藏完成的日期
const autoHide = ref(store.state.settings.autoHide)
const changeHide = state => {store.commit('updateSettings',{key: 'autoHide', value: state})}
</script>

<style scoped>
ul{
  list-style: none;
}
li{
  display: flex;
  justify-content: space-between;
  width: 90%;
}
</style>