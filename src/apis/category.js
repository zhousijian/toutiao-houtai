import axios from '../utils/myaxios'

export const catelist = () => {
  return axios({
    url: '/category'
  })
}
