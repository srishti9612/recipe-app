import axios from 'axios'
import conf from './Config.js' 

const addrecipe = (newRecipe) => {
  console.log('inside add service')
  console.log(newRecipe)

  const config = conf.getConfig()	

  const request = axios.post('/api/add/', newRecipe, config)

  return request.then(response => response.data)
	        .catch(err => console.log(err))
}


export default { addrecipe }
