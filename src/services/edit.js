import axios from 'axios'
import conf from './Config.js'

const editrecipe = (editedRecipe) => {
  console.log("inside edit recipe service")

  const config = conf.getConfig()
  
  const request = axios.put('/api/recipe/', editedRecipe, config)

  return request.then(response => response.data)
	        .catch(err => console.log(err))
}

const editintro = (introObject) => {
   console.log("inside edit bio service")
  
   const config = conf.getConfig()

   const request = axios.put('/api/user/intro', introObject, config)

   return request.then(response => response.data)
	         .catch(err => console.log(err))
}

export default { editrecipe, editintro }
