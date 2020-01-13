import axios from '@/utils/myaxios'

export const articlelist = (params) => {
  return axios({
    url: '/post',
    params
  })
}
