<template>
  <el-dialog v-model="store.state.model.historyModelFlag" title="更新记录" :width="store.state.model.modelWidth">
    <div id="tree" style="height: 60vh; overflow: auto">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-dialog>

</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();

const activities = [
  {
    content: '增加hover样式',
    timestamp: '2022-11-3 8:48',
    size: 'large',
    type: 'primary',
  },
  {
    content: '可以直接编辑todo，修复新增todo无法删除的bug',
    timestamp: '2022-10-09 15:44',
    size: 'large',
    type: 'primary',
  },
  {
    content: '新增设置菜单',
    timestamp: '2022-10-03 15:05',
    size: 'large',
    type: 'primary',
  },
  {
    content: '自动折叠已经完成的任务',
    timestamp: '2022-09-30 9:07',
    size: 'large',
    type: 'primary',
  },
  {
    content: '导航栏透明',
    timestamp: '2022-09-15 9:25',
    size: 'large',
    type: 'primary',
  },
  {
    content: '增加跳转今日按钮，优化导航栏和输入框位置',
    timestamp: '2022-09-12 11:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '优化配色，修改今日标识，解决部分组件显示英文的问题',
    timestamp: '2022-09-08 10:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '自动滚动到当天；优化导航栏显示效果',
    timestamp: '2022-09-02 10:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '修复退出登录后重新登陆数据重复的bug',
    timestamp: '2022-09-01 17:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '自动滚动到当前月，增加侧边导航栏',
    timestamp: '2022-09-01 10:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '增加今日提醒',
    timestamp: '2022-08-31 21:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '增加更新记录',
    timestamp: '2022-08-31 11:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '前端重构',
    timestamp: '2022-08-31 10:00',
    size: 'large',
    type: 'primary',
  },
    {
    content: '优化排版、动画',
    timestamp: '2022-08-31 09:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '后端重构',
    timestamp: '2022-08-30 22:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '优化排版',
    timestamp: '2022-08-30 18:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '增加动画',
    timestamp: '2022-08-30 18:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '增加登录功能',
    timestamp: '2022-08-30 14:00',
    size: 'large',
    type: 'primary',
  },
  {
    content: '第一版发布',
    timestamp: '2022-08-30 01:00',
    size: 'large',
    type: 'primary',

  },
  {
    content: '项目构思',
    timestamp: '2022-08-29 20:00',
    size: 'large',
    type: 'primary',
    hollow: true
  },
]
</script>

<style scoped>
/*滚动条样式*/
#tree::-webkit-scrollbar {
  width: 6px;    
  /*height: 4px;*/
}
#tree::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(145, 145, 145, 0.2); */
  background: rgba(147, 147, 147, 0.2);
}
#tree::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 5px rgba(149, 149, 149, 0.2); */
  border-radius: 0;
  background: rgba(174, 174, 174, 0.1);
}
</style>