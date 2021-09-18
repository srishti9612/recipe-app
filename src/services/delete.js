import axios from 'axios'
import conf from './Config.js'

const deletedraft = draftId => {
   console.log('inside delete draft service')
   
   const config = conf.getConfig()

   const request = axios.delete(`/api/draft/${draftId}`, config)

   return request.then(response => response.data)
	         .catch(err => console.log(err))
}

const deleterecipe = recipeId => {
   console.log('inside delete recipe service')

   const config = conf.getConfig()

   const request = axios.delete(`/api/recipe/${recipeId}`, config)

   return request.then(response => response.data)
	         .catch(err => console.log(err))
}

export default { deletedraft, deleterecipe }
