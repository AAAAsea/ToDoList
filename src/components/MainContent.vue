<template>
  <!-- 主标题 -->
  <h1>Just Do It !</h1>
  <!-- 输入区域 -->
  <div class="dialog" :style="{ position: topSticky ? 'sticky' : 'relative' }">
    <!-- <input type="datetime-local" name="start_time" v-model="time"/> -->
    <el-date-picker
      v-model="time"
      type="datetime"
      placeholder="选择时间"
      format="MM/DD HH:mm"
      value-format="YYYY-MM-DD H:m:s"
      :default-value="new Date()"
    />
    <el-input
      placeholder="在此输入你的待办，选好时间敲下回车创建"
      @keyup.enter="submit"
      type="text"
      maxlength="50"
      v-model="content"
    />
    <el-button @click="submit">提交</el-button>
  </div>
  <!-- 侧边栏 -->
  <transition name="list-animation">
    <div class="sidebar" v-show="topic.length">
      <TransitionGroup name="list-animation">
        <a v-for="item in topic" :key="item" @click="jumpTo(item)">
          {{ item }}
        </a>
      </TransitionGroup>
    </div>
  </transition>
  <!-- 展示区域 -->
  <TransitionGroup name="list-animation">
    <div
      class="list"
      v-for="month in todolist"
      :key="month.month"
      v-show="!month.delete"
      :id="month.month"
    >
      <h2 class="baseline">{{ month.month }}月</h2>
      <div class="main-content">
        <TransitionGroup name="list-animation">
          <div
            v-for="day in month.child"
            :key="day.day"
            v-show="!day.delete && !(autoHide && collapse(day))"
            :id="month.month + '.' + day.day"
          >
            <h3
              style="display: flex; align-items: center; cursor: pointer"
              @click="day.collapseFlag = !day.collapseFlag"
            >
              <span :class="{ today: isToday(month.month, day.day) }">
                {{ month.month + "." + day.day }}
              </span>
              <span style="margin: 0 5px"> · </span>
              <span> 周{{ "日一二三四五六"[day.week] }} </span>
            </h3>
            <el-collapse-transition>
              <ul v-show="!autoFold || !collapse(day)">
                <TransitionGroup name="list-animation">
                  <li
                    v-for="item in day.child"
                    :key="item.id"
                    v-show="!item.delete"
                    :class="{ done: !item.state }"
                  >
                    <el-checkbox
                      :checked="!item.state"
                      @change="changeState(item)"
                      size="large"
                    />
                    <span>{{ item.timeStr }}</span>
                    <el-input
                      class="content"
                      :ref="item.ref"
                      v-if="item.edit"
                      @blur="item.edit = false"
                      @change="changeContent(item)"
                      v-model="item.content"
                    />
                    <span
                      class="content"
                      v-else
                      @click="showInput($event, item)"
                      >{{ item.content }}</span
                    >
                    <span>
                      <svg
                        class="icon"
                        aria-hidden="true"
                        v-show="!item.edit"
                        @click="deleteItem(month, day, item)"
                      >
                        <use xlink:href="#icon-ziyuan"></use>
                      </svg>
                    </span>
                  </li>
                </TransitionGroup>
              </ul>
            </el-collapse-transition>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </TransitionGroup>
  <!-- 跳转今天 -->
  <div class="today-btn" @click="jumpToToday">今</div>
</template>

<script setup>
import request from "@/utils/request";
import { getMonthAndDate } from "@/utils/tools";
import { computed, nextTick, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
const props = defineProps(["loginState"]);
const store = useStore();
const todolist = reactive([]);
const topic = computed(() => todolist.map((e) => e.month));
const emit = defineEmits(["logout"]);
const autoFold = computed(() => store.state.settings.autoFold);
const topSticky = computed(() => store.state.settings.topSticky);
const autoHide = computed(() => store.state.settings.autoHide);

let map = new Map();

function initData() {
  map = new Map();
  todolist.splice(0);

  if (!store.state.user.isLogin) {
    store.state.model.loginModelFlag = true;
    return;
  }

  request({
    url: "/",
    method: "get",
  })
    .then((res) => {
      if (res.code === 20000) {
        res.data.forEach((e) => {
          e.delete = false;
          let date = getMonthAndDate(e.time);
          if (!map[date.month]) map[date.month] = {};
          if (!map[date.month][date.day]) map[date.month][date.day] = [];
          e.timeStr = date.time;

          map[date.month][date.day].push(e);
        });

        for (let i in map) {
          let tempMonth = [];
          for (let j in map[i]) {
            let tempDay = map[i][j];
            tempDay.sort((a, b) => {
              return new Date(a.time) - new Date(b.time);
            });
            let week = new Date(tempDay[0].time).getDay();
            tempMonth.push({
              child: tempDay,
              day: j,
              week,
              delete: false,
            });
          }
          tempMonth.sort((a, b) => {
            return Number(a.day) - Number(b.day);
          });
          todolist.push({
            month: i,
            child: tempMonth,
            delete: false,
          });
        }

        todolist.sort((a, b) => {
          return Number(a.month) - Number(b.month);
        });
        // 自动滚动到最近的一个月,true表示顶部对齐，false表示底部对齐
        nextTick(() => {
          setTimeout(jumpToToday, 300);
        });
      }
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        store.commit("showToast", {
          type: "error",
          message: "登录已失效，请重新登录",
        });
        emit("logout");
      }
    });
}
const collapse = computed(() => {
  return (day) =>
    day.child.every((e) => (!e.state || e.delete) && !day.collapseFlag);
});
watch(
  props,
  () => {
    // console.log(props);
    initData();
  },
  { immediate: true }
);

const time = ref("");
const content = ref("");
function submit() {
  if (!store.state.user.isLogin) {
    store.commit("showToast", {
      type: "warning",
      message: "请先登录",
    });
    store.commit("updateModel", { key: "loginModelFlag", value: true });
    return;
  }
  if (time.value && content.value) {
    if (new Date(time.value).getFullYear() !== new Date().getFullYear()) {
      store.commit("showToast", {
        type: "error",
        message: "只能设置本年内的",
      });
      return;
    }
    request({
      url: "/add",
      method: "post",
      data: {
        time: time.value,
        content: content.value,
      },
    }).then((res) => {
      // console.log(res)
      insertItem({
        time: time.value,
        content: content.value,
        id: res.id
      });
      content.value = "";
    });
  } else {
    store.commit("showToast", {
      type: "error",
      message: "时间和内容不能为空",
    });
  }
}

function changeState(item) {
  item.state = !item.state;
  clearTimeout(item.timeout);
  item.timeout = setTimeout(() => {
    request({
      url: "/update",
      method: "post",
      data: {
        id: item.id,
        state: item.state,
      },
    });
  }, 1000);
}
function changeContent(item) {
  request({
    url: "/alter",
    method: "post",
    data: {
      id: item.id,
      content: item.content,
    },
  }).finally(() => {
    item.edit = false;
  });
}
function showInput(e, item) {
  let p = e.target.parentNode;
  item.edit = true;
  nextTick(() => {
    p.childNodes[2].querySelector("input").focus();
  });
}
function deleteItem(month, day, item) {
  // console.log(item)
  request({
    url: "/delete",
    method: "post",
    data: {
      id: item.id,
    },
  }).then(() => {
    item.delete = true;
    if (day.child.filter((e) => !e.delete).length === 0) day.delete = true;
    if (month.child.filter((e) => !e.delete).length === 0) month.delete = true;
  });
}

function insertItem(item) {
  let date = getMonthAndDate(item.time);
  item.delete = false;
  if(!item.id)
    item.id = new Date().toString();
  item.state = 1; // 1表示未完成
  item.timeStr = date.time;
  let obj = {};
  if (!map[date.month]) {
    map[date.month] = {
      [date.day]: [item],
      delete: false,
    };
    todolist.push({
      month: date.month,
      child: [
        {
          day: date.day,
          child: [item],
          week: date.week,
          delete: false,
        },
      ],
    });
    todolist.sort((a, b) => {
      return Number(a.month) - Number(b.month);
    });
    return;
  } else if (!map[date.month][date.day]) {
    let temp = todolist.find((e) => e.month == date.month);
    map[date.month][date.day] = [item];
    temp.delete = false;
    temp.child.push({
      day: date.day,
      week: date.week,
      child: [item],
      delete: false,
    });
    temp.child.sort((a, b) => {
      return Number(a.day) - Number(b.day);
    });
    return;
  } else {
    let tempMonth = todolist.find((e) => e.month == date.month);
    tempMonth.delete = false;
    let tempDay = tempMonth.child.find((e) => e.day == date.day);
    tempDay.delete = false;
    tempDay.child.push(item);
    tempDay.child.sort((a, b) => {
      return new Date(a.time) - new Date(b.time);
    });
  }
}

function isToday(month, date) {
  let d = new Date();
  return d.getMonth() + 1 == month && d.getDate() == date;
}
// 避免更改hash引起history不必要增多
function jumpTo(month) {
  document.getElementById(month).scrollIntoView();
}

function jumpToToday() {
  let { month, day } = getMonthAndDate(new Date());
  // 当月在今天之后没有任务就跳到下一个月
  let flag = false;

  if (map[month]) {
    if (map[month][day]) {
      document.getElementById(month + "." + day).scrollIntoView();
    } else {
      for (let i = day + 1; i < 32; i++) {
        if (map[month][i]) {
          flag = true;
          document.getElementById(month + "." + i).scrollIntoView();
          return;
        }
      }
    }
  }

  if (!flag) {
    for (let i = month + 1; i < 13; i++) {
      if (map[i]) {
        document.getElementById(i).scrollIntoView();
        return;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.today-btn {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  color: var(--font-color);
  background: var(--el-color-primary);
  border-radius: 50%;
  position: fixed;
  right: 15px;
  bottom: 30px;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;
  &:active {
    transform: scale(0.95);
    opacity: 0.8;
  }
}
.sidebar {
  width: 30px;
  position: sticky;
  top: 100px;
  float: right;
  border: 1px solid #888;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-color);
  z-index: 99;
  a {
    transition: background 0.3s;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    text-decoration: none;
    color: var(--font-color);
    cursor: pointer;
    &:hover {
      background: var(--el-color-primary);
      color: var(--bg-color);
    }
  }
}
.list-animation-move, /* 对移动中的元素应用的过渡 */
  .list-animation-enter-active,
  .list-animation-leave-active {
  transition: all 0.5s ease;
}

.list-animation-enter-from,
.list-animation-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
    以便能够正确地计算移动的动画。 */
.list-animation-leave-active {
  position: absolute;
  width: 50%;
}
// .today::after{
//   content: '';

//   margin-left: 10px;
//   color: var(--el-color-primary);
// }
.baseline::after {
  content: "";
  display: block;
  height: 2px;
  width: 0%;
  margin-top: 3px;
  background: var(--font-color);
  transition: 0.3s;
}
.baseline:hover::after {
  width: 100%;
}
.list {
  width: 80%;
  margin: 0 auto;
  padding-top: 30px;
  .main-content {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}
@media screen and (max-width: 600px) {
  .list {
    width: 90%;
  }
}
.list ul {
  margin-left: -10px;
  list-style-type: none;
  li {
    display: flex;
    padding: 3px 0;
    font-size: 18px;
    column-gap: 10px;
    transition: opacity 0.3s, transform 0.3s;
    align-items: center;
    .content {
      word-break: break-all;
    }
    .el-checkbox {
      transform: scale(1.2);
      cursor: pointer;
    }
    svg {
      display: flex;
      opacity: 0;
      cursor: pointer;
      transition: 0.2s;
      pointer-events: none;
    }
    &:hover svg {
      opacity: 1;
      pointer-events: all;
    }
  }
}

.today {
  background: var(--el-color-primary);
  padding: 10px;
  border-radius: 50%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
}
.done {
  text-decoration: line-through;
  opacity: 0.13;
}
h1 {
  margin: 0 auto;
  text-align: center;
  margin-top: 30vh;
  font-size: 50px;
}
.dialog {
  top: 10px;
  // background: var(--bg-color);
  z-index: 21;
  width: 70%;
  margin-top: -20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 100px;
  .el-input,
  .el-input__wrapper,
  .el-button {
    background-color: var(--bg-color);
  }
}
@media screen and (max-width: 600px) {
  .dialog {
    width: 95%;
    top: 50px;
  }
}
.dialog input {
  padding: 0 5px;
  height: 30px;
  border-radius: 5px;
}
.dialog input:nth-child(2) {
  flex: 1;
}
.dialog input:last-child {
  cursor: pointer;
}
.dialog input:last-child:active {
  opacity: 0.7;
}
</style>