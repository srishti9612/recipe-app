import axios from 'axios'
import conf from './Config.js'

const addFollowing = (followname) => {
   console.log("inside following service")

   const config = conf.getConfig()

   const object = { followname: followname }

   //const request = axios.post('/api/addfollowing', { params: object }, config)

   const request = axios.post('/api/user/follow', { params: object }, config)

   return request.then(response => response.data)
	         .catch(err => console.log(err))
}

export default { addFollowing }
