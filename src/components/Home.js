import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Feed from './Feed/Feed'
import Nav from './Nav/Nav'
import { FilterContext } from './utils/FilterContext'
import './Home.css'

const Home = ({ setLoggedIn }) => {

   const [ filter, setFilter ] = useState(null)
 
   return (
     <div className="flex-container">
       <FilterContext.Provider value={{filter, setFilter}}>
         <Sidebar/>
         <Feed/>
       </FilterContext.Provider>
       <Nav setLoggedIn={setLoggedIn}/>
     </div>
   )
}

export default Home
