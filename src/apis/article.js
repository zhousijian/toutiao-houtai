import axios from '@/utils/myaxios'

export const articlelist = () => {
  return axios({
    url: '/post'
  })
}
