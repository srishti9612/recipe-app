import axios from 'axios'
import conf from './Config.js'

const adddraft = (newDraft) => {
  console.log('inside draft service')
 
  const config = conf.getConfig()

  const request = axios.post('/api/adddraft', newDraft, config)

  return request.then(response => response.data)
	        .catch(err => console.log(err))

}

const updatedraft = (updDraft) => {
   console.log('inside update draft service')

   const config = conf.getConfig()

   const request = axios.post('/api/updatedraft/', updDraft, config)

   return request.then(response => response.data)
	        .catch(err => console.log(err))
}

const publishdraft = (updDraft) => {
  console.log('inside publish draft service')

  const config = conf.getConfig()

  const request = axios.post('/api/publishdraft/', updDraft, config)

  return request.then(response => response.data)
	       .catch(err => console.log(err))
}


export default { adddraft, updatedraft, publishdraft }
