export default {
  data:{
    ...JSON.parse(localStorage.getItem('data'))

  },
  model:{
    loginModelFlag: false,
    historyModelFlag: false,
    settingsModelFlag: false,
    modelWidth: '40%',
    ...JSON.parse(localStorage.getItem('settings'))
  },
  user:{
    isLogin: false,
    token: '',
    nickName: '',
    ...JSON.parse(localStorage.getItem('user'))
  },
  settings:{
    lang: 'zh-CN',
    theme: 'light',
    autoFold: true,
    topSticky: true,
    autoHide: false,
    ...JSON.parse(localStorage.getItem('settings'))
  },
}