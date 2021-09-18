import axios from 'axios'
import conf from './Config.js'

const getAll = (filter) => {
    console.log("getallservice filter value")
    console.log(filter)
    const request = axios.get('/api/recipe/all', { params: filter })
    return request.then(response => response.data)
}

const getUserRecipes = (username) => {
    console.log("getUserRecipe service")
    console.log(username)
    const request = axios.get('/api/recipe/urecipes', { params: username })
    return request.then(response => response.data)
}

const getUserInfo = (username) => {
   console.log("get userbio service")
   console.log(username)
   const request = axios.get('/api/user/info', { params: username })
   return request.then(response => response.data)
}

const getAllDrafts = () => {
     const config = conf.getConfig()
     const request = axios.get('/api/draft/all', config)
     return request.then(response => response.data)
}

const getAllBookmarks = () => {
     const config = conf.getConfig()
     const request = axios.get('/api/bookmark/all', config)
     return request.then(response => response.data)
}

const getFollowingNames = () => {
    console.log("inside following names service")
    const config = conf.getConfig()
    const request = axios.get('/api/user/followingauthors', config)
    return request.then(response => response.data)
}

const getFollowingRecipes = () => {
    console.log("inside following recipes service")
    const config = conf.getConfig()
    const request = axios.get('/api/recipe/followingrecipes', config)
    return request.then(response => response.data)
}

export default { getAll, getAllDrafts, getUserRecipes, getUserInfo, getAllBookmarks, getFollowingNames, getFollowingRecipes }
