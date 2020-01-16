import axios from '@/utils/myaxios'

// 文章列表
export const articlelist = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 发布文章
export const articleFB = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}

// 文章详情
export const articlexq = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 编辑文章
export const editarticle = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_update/${id}`,
    data
  })
}
