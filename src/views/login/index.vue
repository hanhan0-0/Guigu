<!-- 登录 -->
<template>
  <div class="container">
    <div class="stars">
      <div
        v-for="(item, index) in starsCount"
        class="star"
        :ref="(el) => setRefs(el)"
        :key="index"
      ></div>
    </div>
    <div class="form" @mouseenter="goIn" @mouseleave="leaveOut" ref="form">
      <span
        v-show="ishow"
        ref="span"
        :class="{ in: isAddIn, out: isAddOut }"
      ></span>

      <el-form
        label-position="center"
        :model="loginForm"
        :rules="rules"
        ref="loginForms"
      >
        <el-form-item><h1>登录</h1></el-form-item>
        <el-form-item prop="username">
          <el-input
            type="text"
            placeholder="请输入账号"
            v-model="loginForm.username"
          >
            <template #prefix>
              <el-icon color="white"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="text"
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
          >
            <template #prefix>
              <el-icon color="white"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

const useStore = useUserStore()
const router = useRouter()
const route = useRoute()
const starsCount = 800 //星星数量
const distance = 800 //间距
const refs = reactive([])
const setRefs = (el) => {
  refs.push(el)
}
const loginForm = reactive({ username: '18841426949', password: '123456' })
const loginForms = ref()
let isIn = true //鼠标进去的门，默认打开
let isOut = false //鼠标出去的门，默认关闭
const isAddIn = ref(false)
const isAddOut = ref(false)
const ishow = ref(false)
const form = ref()
const span = ref()
// 定义变量控制按钮的加载效果
const loading = ref(false)
onMounted(() => {
  refs.forEach((item) => {
    let speed = 0.2 + Math.random() * 1
    let thisDistance = distance + Math.random() * 300
    item.style.transformOrigin = `0 0 ${thisDistance}px`
    item.style.transform = `
        translate3d(0,0,-${thisDistance}px)
        rotateY(${Math.random() * 360}deg)
        rotateX(${Math.random() * -50}deg)
        scale(${speed},${speed})`
  })
})
async function login() {
  //保证全部的表单项校验通过再发请求
  try {
    await loginForms.value.validate()
  } catch (e) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: '账号或密码不正确',
    })
    return
  }
  try {
    loading.value = true
    await useStore.userLogin(loginForm)
    loading.value = false
    // 判断登录的时候，路由路径当中是否有query参数,如果有就往query参数跳转，没有就跳转到首页
    const redirect = route.query.redirect

    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `HI,${getTime()}好！`,
    })
  } catch (e) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: error.message,
    })
  }
}
//自定义校验规则函数
const validatorUserName = (rule, value, callback) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //callback:一个函数，如果符合校验规则，callback放行通过，如果不符合校验信息，也调用callback方法，但注入错误提示信息
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!reg.test(value)) {
    callback(new Error('手机号格式不正确'))
  } else {
    callback()
  }
}
const validatorPassword = (rule, value, callback) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //callback:一个函数，如果符合校验规则，callback放行通过，如果不符合校验信息，也调用callback方法，但注入错误提示信息
  const reg = /^\d+$/
  if (!reg.test(value)) {
    callback(new Error('密码应为全数字'))
  } else {
    callback()
  }
}
const rules = {
  //规则对象属性：
  //required，代表这个字段务必要校验的
  //min：文本长度至少多少位
  //max:文本长度最多多少位
  //message:错误的提示信息
  //trigger:触发校验表单的时机，change：文本发生变化触发校验，blur：失去焦点的时候触发校验
  username: [
    // { required: true, message: 'Please input Activity name', trigger: 'blur' },
    {
      require: true,
      min: 11,
      max: 11,
      message: '账号长度应为11位',
      trigger: 'change',
    },
    {
      trigger: 'change',
      validator: validatorUserName,
    },
  ],
  password: [
    // { require: true, message: '不能为空', trigger: 'blur' },
    {
      require: true,
      min: 6,
      max: 18,
      message: '密码长度在6到10位之间',
      trigger: 'change',
    },
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
}

function goIn(e) {
  if (isIn) {
    //如果进去的门时打开的，就可以执行这个函数0

    //获取进入的鼠标位置
    //生成元素的位置=进入点距离窗口的距离-父盒子距离窗口的距离
    let inx = e.clientX - e.target.offsetLeft
    let iny = e.clientY - e.target.offsetTop
    console.log(inx, iny)
    //创建一个span元素，并且给它对应的出生坐标
    ishow.value = true
    span.value.style.left = inx + 'px'
    span.value.style.top = iny + 'px'

    isAddIn.value = true //添加进入的动画
    isAddOut.value = false //除去出去的动画 不知道这样写是不是不太好

    isIn = false //关闭进来的门（不能使用进入的方法）
    isOut = true //打开出去的门（可以使用出去的方法）
  }
}
function leaveOut(e) {
  if (isOut) {
    //获取出去的鼠标位置
    //生成元素的位置=进入点距离窗口的距离-父盒子距离窗口的距离
    let inx = e.clientX - e.target.offsetLeft
    let iny = e.clientY - e.target.offsetTop
    isAddIn.value = false
    isAddOut.value = true

    span.value.style.left = inx + 'px'
    span.value.style.top = iny + 'px'

    isOut = false //关闭出去的大门

    //当动画结束后再删除元素
    setTimeout(() => {
      ishow.value = false
      isIn = true //打开进来的大门
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  background: radial-gradient(
    200% 100% at bottom center,
    #f7f7b6,
    #e96f92,
    #1b2947
  );
  background: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  .stars {
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: fixed;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotate 66s infinite linear;
    bottom: 50%;
    // z-index: -99;
    .star {
      width: 2px;
      height: 2px;
      background: #f7f7b8;
      position: fixed;
      top: 0;
      left: 0;
      backface-visibility: hidden;
    }
  }
  .form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    background-color: rgba(197, 186, 251, 0.3);
    border-radius: 10px;
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;
    .el-form {
      width: 100%;
      h1 {
        color: white;
        z-index: 99;
        text-align: center;
        width: 100%;
      }
      .el-input {
        padding: 0;
        margin: 0;
        background: transparent;
        border: 0px;
        border-bottom: 1px solid white;
        height: 35px;
        color: white;
        z-index: 99;
        width: 100%;
        :deep(.el-input__wrapper) {
          background-color: transparent;
          box-shadow: none;
          .el-input__inner {
            color: white;
            &::placeholder {
              color: #ffffff; /* 设置占位符文本颜色 */
            }
          }
          .el-icon {
            svg {
              color: white;
            }
          }
        }
      }
      .el-button {
        width: 100%;
        margin-top: 20px;
        z-index: 99;
      }
    }
  }
}
.in {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: #75517d;
  transform: translate(-50%, -50%);
  /* 使用in动画，持续0.5s,缓出的时间函数，停留在最后一帧 */
  animation: in 0.5s ease-out forwards;
}
.out {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 1200px;
  height: 1200px;
  border-radius: 50%;
  background: #75517d;
  transform: translate(-50%, -50%);
  animation: out 0.5s ease-out forwards;
}
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateY(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateY(-40deg)
      rotateY(-360deg);
  }
}
@keyframes in {
  /* 初始关键帧 */
  0% {
    width: 0;
    height: 0;
  }
  /* 结尾关键帧 */
  100% {
    width: 1200px;
    height: 1200px;
  }
}
/* 设置鼠标离开时，元素的动画 */
@keyframes out {
  /* 初始关键帧 */
  0% {
    width: 1200px;
    height: 1200px;
  }
  /* 结尾关键帧 */
  100% {
    width: 0;
    height: 0;
  }
}
</style>
