import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Feed from './Feed/Feed'
import Nav from './Nav/Nav'
import retrieveService from './../services/retrieve.js'
import { FilterContext } from './utils/FilterContext'
import { FollowingAuthorsContext } from './utils/FollowingAuthorsContext'
import './Home.css'

const Home = ({ setLoggedIn }) => {

   const [ filter, setFilter ] = useState(null)
   const [ followingNames, setFollowingNames ] = useState([])


   /// 1. add a service here to retrieve an array containing all the users 
   /// followed by the current user
   /// 2. add a service here to retrieve an array of all the recipes by the 
   /// users followed by current user. (actually add this in feed component)
   
   useEffect(() => {

     console.log("inside following names useEffect")
      retrieveService.getFollowingNames()
	            .then(returnedObject => {
		      console.log(returnedObject)
		      setFollowingNames([...returnedObject])
		    })
   }, [])

   return (
     <div className="flex-container">
       <FollowingAuthorsContext.Provider value={{followingNames}}>
       <FilterContext.Provider value={{filter, setFilter}}>
         <Sidebar/>
         <Feed followingNames={followingNames}/>
       </FilterContext.Provider>
       </FollowingAuthorsContext.Provider>
       <Nav setLoggedIn={setLoggedIn}/>
     </div>
   )
}

export default Home
