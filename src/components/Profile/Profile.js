import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import './../Common.css'
import './../CommonLayout.css'
import './Profile.css'
import retrieveService from '../../services/retrieve.js'
import followService from '../../services/follow.js'
import { ReactComponent as FoodLogo } from './../assets/food.svg'
import { ReactComponent as BackLogo } from './../assets/back.svg'
import { ReactComponent as ProfileImg } from './../assets/profileimg.svg'
import helper from './../utils/helper.js'
import Loader from 'react-loader-spinner'
import { FollowingAuthorsContext } from '../utils/FollowingAuthorsContext'


const Profile = () => {


  const { followingNames } = useContext(FollowingAuthorsContext)

  console.log(followingNames)
 
  const history = useHistory()

  console.log(history)

  const location = useLocation()

  //const username = location.state.username
  const { username } = useParams() 
  
  /*let typeVal = window.localStorage.getItem('type')

  const type = (typeVal !== null) ? window.localStorage.getItem('type') : location.state.type

  window.localStorage.setItem('type', type)

  console.log(type)*/
	
  /*temp if (location.state.following !== undefined) {
    window.localStorage.setItem('following', location.state.following)
    console.log(location.state.following)
  }*/

  const [ urecipes, setUrecipes ] = useState([])

  const [ ubio, setUbio ] = useState('')

  const [ followButton, setFollowbutton ] = useState('')

  console.log(username)

  console.log(window.localStorage.getItem('following'))
  console.log(followButton) 

  // add a service to retrieve all recipes and bio of the given username
	
  let uObject = { uname: username }

  useEffect(() => {

   /*temp if (history.location.state && (history.location.state.following !== undefined)) {
     let state = { ...history.location.state }
     delete state.following
     history.replace({ ...history.location, state })
   }

   console.log(history)

   let follVal = JSON.parse(window.localStorage.getItem('following'))

   console.log(follVal)

   if (follVal === true) {
     setFollowbutton('Following')
   } else if (follVal === false){
     setFollowbutton('Follow')
   }*/

   retrieveService.getUserBio(uObject)
	          .then(returnedObject => {
		     console.log(returnedObject[0].bio)
		     setUbio(returnedObject[0].bio)
		  })

   retrieveService.getUserRecipes(uObject)
	          .then(returnedObject => {
		     setUrecipes(returnedObject)
		     console.log(returnedObject)
		     let proId = window.localStorage.getItem('proId')
		     let contId = 'section2'
		     helper.scrollfunc(proId, contId)
		     window.localStorage.setItem('proId', 'proId-0')
		  })

  }, [])


  const handleFollow = () => {
    /// add a service here that adds the current user to the follower list of 
    /// this user and adds this user to the following list of current user
	/*temp followService.addFollowing(username)
	          .then(returnedObject => {
		     console.log(returnedObject)
		     if (returnedObject) {
			if (followButton === "Follow") {
		          window.localStorage.setItem('following', true)
		          setFollowbutton("Following")
			  console.log('Started following')
		        } else {
			  window.localStorage.setItem('following', false)
			  setFollowbutton("Follow")
			  console.log('stopped following')
			}
		     } 
		  })*/
  }

  /*const handleBack = () => {

     let typeVal = window.localStorage.getItem('type')
     window.localStorage.removeItem('type')
     console.log(typeVal)

     window.localStorage.removeItem('following')

     if (typeVal === 'home') {
       history.push('/home')
     } else if (typeVal === 'myprofile') {
       history.push('/myprofile')
     }
  }*/

  const handleBack = () => {
     console.log("history: ") 
     history.goBack()
  }

  return (
    <div className="flex-container">
      <div className="Side">
         <BackLogo className="backlogo" onClick={handleBack}/>
         <div className="middle"></div>
         <FoodLogo className="foodlogo"/>
      </div>
      <div className="content">
        <div className="section1">

	  <div className="row1">
	     <div className="r1c1">
	       <ProfileImg className="profileimg" />
	     </div>
	     <div className="r1c2">
	       <div className="r1c2-r1">
                 <div className="r1c2-r1-c1">
	           <b>{username}</b>
	         </div>
	         <div className="r1c2-r1-c2">
	           {
		    (username !== window.localStorage.getItem("loggedUser")) ? (  
	              <button id="followbutton"
			      className="ripple"
			      onClick={handleFollow}>{followButton}</button>
		    ) : (
		      <div></div>
		    )
		   }
	         </div>
	       </div>
	       <div className="r1c2-r2">
	          {ubio}
	       </div>
	     </div>
	  </div>

	  <div className="row2">
	   <div className="userRecipes">Recipes</div>
	  </div>

	</div>

	<div className="section2" id="section2">
          { (urecipes.length > 0) ?
	    urecipes.map((recipe, i) =>
              <div id={'proId-' + i}
                   className="listitem"
                   data-animation-offset={i}>
              <p id="precipetext"
                 onClick={() => {
		 window.localStorage.setItem('proId', 'proId-'+ i) 
                 history.push('/viewrecipe', {recipe: recipe, type: 'profile'})
                 }}>{recipe.title}</p>
             </div>
           ) : (
	      // loader comes here
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
      <div className="bar"></div>
    </div>
  )
}

export default Profile                        
