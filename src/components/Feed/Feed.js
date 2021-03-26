import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './Feed.css'
import retrieveService from '../../services/retrieve.js'
import { FilterContext } from './../utils/FilterContext'
import { Link } from "react-router-dom"
import helper from './../utils/helper.js'
import Loader from 'react-loader-spinner'

const Feed = ({ followingNames }) => {

  console.log(followingNames)
  console.log(helper)

  //followingnames is to be used to show whether or not the user is followed
  
  const { filter } = useContext(FilterContext)

  const [ recipesAll, setrecipesAll ] = useState([])

  const followingAuthors = followingNames

  const history = useHistory()

  console.log("inside feed filter ")
  console.log(filter)

  let recipeArray

  const handleAll = () => {
    console.log("handleAll")
    document.getElementById("All").style.fontWeight = "bold"
    document.getElementById("Followee").style.fontWeight = "normal"
    
    window.localStorage.setItem('feedtype', 'All')
    // add a script to retrieve all the recipes in recipes array

    setrecipesAll([])
	  
    let filterObj = JSON.parse(window.localStorage.getItem('filter'))
    console.log("local storage filter value")
    console.log(filterObj)

    retrieveService.getAll(filterObj)
	           .then(returnedObject => {
			recipeArray = []
			setrecipesAll(recipeArray)
		        recipeArray = [...returnedObject]
			setrecipesAll(recipeArray)
			console.log(recipesAll)
			let eleId = window.localStorage.getItem('eleId')
                        console.log(eleId)
                        let contId = 'feed2'
                        helper.scrollfunc(eleId, contId)
                        window.localStorage.setItem('eleId', 0)
		   })
  }

  const handleFollowee = () => {
    console.log("handleFollowee")
    document.getElementById("Followee").style.fontWeight = "bold"
    document.getElementById("All").style.fontWeight = "normal"

    // add a script to retrieve all the recipes by followees in recipes array

    window.localStorage.setItem('feedtype', 'Following')

    setrecipesAll([])
    retrieveService.getFollowingRecipes()
	           .then(returnedObject => {
		      recipeArray = []
		      setrecipesAll(recipeArray)
		      recipeArray = [...returnedObject]
		      console.log(recipeArray)
		      setrecipesAll(recipeArray)
		      console.log(recipesAll)
		      let eleId = window.localStorage.getItem('eleId')
                      console.log(eleId)
                      let contId = 'feed2'
                      helper.scrollfunc(eleId, contId)
                      window.localStorage.setItem('eleId', 0)
		   })
  }

  useEffect(() => {
     console.log("inside useeffect")
     let filterObj = JSON.parse(window.localStorage.getItem('filter'))
     console.log("local storage filter value")
     console.log(filterObj)
     
  
     let feedtype = window.localStorage.getItem('feedtype')

     if (!feedtype) {

     window.localStorage.setItem('feedtype', 'All')

     retrieveService
       .getAll(filterObj)
       .then(returnedObject => {
	         console.log(returnedObject)
	         recipeArray = []
	         setrecipesAll(recipeArray)
	         recipeArray = [...returnedObject]
                 setrecipesAll(recipeArray)
	         console.log(recipesAll)
	         console.log(recipesAll.length)
       })

     } else if (feedtype === 'All') {
        handleAll()
     } else if (feedtype === 'Following') {
        handleFollowee()
     }

  }, [filter])

  return (
    <div id="feed">
     <div id="feed1">
       <div id="All" onClick={handleAll}>All</div> 
       <div id="Followee" onClick={handleFollowee}>Following</div>
     </div>
     <div id="feed2">
       { (recipesAll.length > 0) ?
         recipesAll.map((recipe, i) =>
	    <div id={i}
		 key={i}
		 className="listitem"
		 data-animation-offset={i}
		 onClick={() => {
		   window.localStorage.setItem('eleId', i)
	           console.log(window.localStorage.getItem('eleId'))
		 }}>
	      <p id="recipetext" 
		 onClick={() => {
		    console.log(i)
		    history.push('/viewrecipe', {recipe: recipe})
		 }}>{recipe.title}</p>
              <i id="create">created by: </i>
	      <Link
		id="prolink"
		to={{
		pathname: (recipe.author === window.localStorage.getItem('loggedUser')) ? "/myprofile" : "/profile",
	        state: { 
	         username: recipe.author, 
		 following: followingAuthors.includes(recipe.author) ? true : false,
		 type: "home"
	        }
	      }}><i>{recipe.author}</i></Link>
	    </div>
	 ) : (
	  <div className="loader">
	   <Loader
	     id="loader-comp"
	     type="BallTriangle"
	     color="#737373"
	     height={60}
	     width={60}
	     timeout={3000}/>
	  </div>
	 )
       }
     </div>
    </div>
  )
}

export default Feed
