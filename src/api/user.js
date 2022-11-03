import request from '../utils/request'


/**
 * 获取本人信息
 */
export function getMyInfo(){
  return request({
    url: '/users/info',
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  })
} 
/**
 * 获取用户信息
 */
export function getUserInfo(id){
  return request({
    url: '/users/profile/'+id,
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  })
} 
/**
 * 修改用户昵称
 */
export function changeNickName(nickName){
  return request({
    url: '/users/nickName',
    method: 'post',
    params: {
      nickName
    },
  })
}
/**
 * 修改用户介绍
 */
export function changeDescription(description){
  return request({
    url: '/users/description',
    method: 'post',
    params: {
      description
    },
  })
}
/**
 * 修改用户昵头像
 */
export function changeAvatar(headerImage){
  return request({
    url: '/users/upload',
    method: 'post',
    params: {
      headerImage
    },
  })
}
/**
 * 关注
 */
export function follow(entityId){
  return request({
    url: '/follow',
    method: 'post',
    params: {
      entityType: 3,
      entityId
    },
  })
}
/**
 * 取关
 */
export function unfollow(entityId){
  return request({
    url: '/unfollow',
    method: 'post',
    params: {
      entityType: 3,
      entityId
    },
  })
}
/**
 * 获取关注列表
 */
export function getFollowees(id, offset = 0, limit = 10){
  return request({
    url: '/followees/' + id,
    method: 'get',
    params: {
      offset,
      limit
    },
  })
}

/**
 * 获取粉丝
 */
export function getFollowers(id, offset = 0, limit = 10){
  return request({
    url: '/followers/' + id,
    method: 'get',
    params: {
      offset,
      limit
    },
  })
}

/**
 * 获取通知
 */
export function getNotice(){
  return request({
    url: '/notice/list',
    method: 'get',
    params: {
    },
  })
}

/**
 * 获取点赞信息
 */
export function getLikeNotice(offset=0,limit=10){
  return request({
    url: '/notice/detail/like',
    method: 'get',
    params: {
      offset,
      limit
    },
  })
}

/**
 * 获取评论信息
 */
export function getCommentNotice(offset=0,limit=10){
  return request({
    url: '/notice/detail/comment',
    method: 'get',
    params: {
      offset,
      limit
    },
  })
}

/**
 * 获取关注信息
 */
export function getFollowNotice(offset=0,limit=10){
  return request({
    url: '/notice/detail/follow',
    method: 'get',
    params: {
      offset,
      limit
    },
  })
}
/**
 * 获取聊天记录
 */
export function getChatRecord(conversationId,offset=0,limit=10){
  return request({
    url: '/letter/detail/' + conversationId,
    method: 'get',
    params: {
      offset,
      limit
    },
  })
}

/**
 * 发送私信
 */
export function sendLetter(toName, content){
  return request({
    url: '/letter/send',
    method: 'post',
    params: {
      toName,
      content
    },
  })
}

/**
 * 获取私信记录
 */
export function getLetterNotice(offset=0, limit=10){
  return request({
    url: '/letter/list',
    method: 'get',
    params: {
      offset,
      limit
    },
  })
}
/**
 * 获取用户总数
 */
export function getUsersCount(){
  return request({
    url: '/users/count',
    method: 'get',
    params: {
    },
  })
}



