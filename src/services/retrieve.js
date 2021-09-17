import axios from 'axios'
import conf from './Config.js'

const getAll = (filter) => {
    console.log("getallservice filter value")
    console.log(filter)
    //const request = axios.get('/api/retrieve/all/', { params: filter })
    const request = axios.get('/api/recipe/all', { params: filter })
    return request.then(response => response.data)
}

const getUserRecipes = (username) => {
   // find all recipes with the given username as author
    console.log("getUserRecipe service")
    console.log(username)
    //const request = axios.get('/api/retrieve/urecipes', { params: username })
    const request = axios.get('/api/recipe/urecipes', { params: username })
    return request.then(response => response.data)
}

const getUserBio = (username) => {
   // find the bio for the given username, change name to userinfo later as you are also retrieving followers
   console.log("get userbio service")
   console.log(username)
   //const request = axios.get('/api/retrieve/ubio', { params: username })
   const request = axios.get('/api/user/info', { params: username })
   return request.then(response => response.data)
}

const getAllDrafts = () => {
     const config = conf.getConfig()
     //const request = axios.get('/api/retrieve/drafts/', config)
     const request = axios.get('/api/draft/all', config)
     return request.then(response => response.data)
}

const getAllBookmarks = () => {
  // find all the bookmarks for the current user
     const config = conf.getConfig()
     //const request = axios.get('/api/retrieve/bookmarks/', config)
     const request = axios.get('/api/bookmark/all', config)
     return request.then(response => response.data)
}

const getFollowingNames = () => {
    console.log("inside following names service")
    const config = conf.getConfig()
    //const request = axios.get('/api/retrieve/followingnames', config)
    const request = axios.get('/api/user/followingauthors', config)
    return request.then(response => response.data)
}

const getFollowingRecipes = () => {
    console.log("inside following recipes service")
    const config = conf.getConfig()
    //const request = axios.get('/api/retrieve/followingrecipes', config)
    const request = axios.get('/api/recipe/followingrecipes', config)
    return request.then(response => response.data)
}

export default { getAll, getAllDrafts, getUserRecipes, getUserBio, getAllBookmarks, getFollowingNames, getFollowingRecipes }
