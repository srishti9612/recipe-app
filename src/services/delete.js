/* 1. Delete draft service
 * 2. Delete recipe service
 */

import axios from 'axios'
import conf from './Config.js'

const deletedraft = draftId => {
   console.log('inside delete draft service')
   
   const config = conf.getConfig()

   const request = axios.delete(`/api/drafts/${draftId}`, config)

   return request.then(response => response.data)
	         .catch(err => console.log(err))
}

const deleterecipe = recipeId => {
   console.log('inside delete recipe service')

   const config = conf.getConfig()

   const request = axios.delete(`/api/recipes/${recipeId}`, config)

   return request.then(response => response.data)
	         .catch(err => console.log(err))
}

export default { deletedraft, deleterecipe }
