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
