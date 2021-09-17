import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './../Common.css'
import './../CommonLayout.css'
import './MyProfile.css'
import retrieveService from '../../services/retrieve.js'
import editService from '../../services/edit.js'
import { ReactComponent as FoodLogo } from './../assets/food.svg'
import { ReactComponent as BackLogo } from './../assets/back.svg'
import { ReactComponent as ProfileImg } from './../assets/profileimg.svg'
import Loader from 'react-loader-spinner'
import helper from './../utils/helper.js'

const MyProfile = () => {

   const history = useHistory()

   const [ followingNames, setFollowingNames ] = useState([])	

   const [ followingNumber, setFollowingNumber ] = useState(0)

   const [ urecipes, setUrecipes ] = useState([])

   const [ ubio, setUbio ] = useState('')

   const [ introEdit, setIntroedit ] = useState(false)

   const [ newIntro, setNewintro ] = useState('')

   const [ selected, setSelected ] = useState('recipes')

   let loggedUser = window.localStorage.getItem('loggedUser')

   console.log(loggedUser)

   let uObject = { uname: loggedUser }

   useEffect(() => {
     console.log("inside useEffect")

     retrieveService.getUserBio(uObject)
	            .then(returnedObject => {
		      console.log(returnedObject[0].bio)
		      setUbio(returnedObject[0].bio)
		    })

     retrieveService.getUserRecipes(uObject)
	            .then(returnedObject => {
		      setUrecipes(returnedObject)
		      console.log(returnedObject)
		      let mproId = window.localStorage.getItem('mproId')
                      let contId = 'section2'
                      helper.scrollfunc(mproId, contId)
                      window.localStorage.setItem('mproId', 'mproId-0')
		    })

     retrieveService.getFollowingNames()
	            .then(returnedObject => {
		      console.log(returnedObject)
		      setFollowingNames([...returnedObject])
		      setFollowingNumber([...returnedObject].length)
		    })
   }, [])

   const handleBack = () => {
      history.push('/home')
   }

   const handleIntroEdit = () => {
      console.log("handle intro edit")
      setIntroedit(true)
      setNewintro(ubio)
   }

   const handleIntroChange = (e) => {
      console.log("handle intro change")
      setNewintro(e.target.value)
   }

   const introEditSubmit = (e) => {
      console.log(" inside intro edit submit")
      /// add a service here to submit edited bio
	
      e.preventDefault()

      const introObject = {
         bio: newIntro
      }

      editService.editintro(introObject)
	         .then(returnedObject => {
		   console.log(returnedObject)
	           setUbio(newIntro)
		   setIntroedit(false)
	           helper.showtoast("Intro Edited!!")
		 })
   }

   const handleSelected = (e) => {
      const Id = e.target.id

      if (Id === "userRecipes") {
         setSelected('recipes')
	 window.localStorage.setItem('selected', 'recipes')
         document.getElementById(Id).style.fontWeight = "bold"
	 document.getElementById('followingAuthors').style.fontWeight = "normal"
      }
     
      if (Id === "followingAuthors") {
	  setSelected('followingAuthors')
	  window.localStorage.setItem('selected', 'followingAuthors')
          document.getElementById(Id).style.fontWeight = "bold"
          document.getElementById("userRecipes").style.fontWeight = "normal"
      }
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
	           <b>{loggedUser}</b>
                  </div>
                  <div className="r1c2-r1-c2">
                    <div></div>
                  </div>
                </div>
                <div className="r1c2-r2">
	           <div className="intro"><b>Intro</b> 
	             <Link 
	               className="introeditlink"
	               onClick={handleIntroEdit}>Edit</Link>
	           </div>
	           {
	            (introEdit) ? 
		    (
		      <div className="introEdit">
		        <form onSubmit={introEditSubmit} className="introform">
			 <div className="formcontents">
			  <textarea
			    type="text"
			    name="intro"
			    id="intro"
			    className="introTextarea"
			    value={newIntro}
			    onChange={handleIntroChange}
			  />
			  <input
			    type="submit"
			    id="sintroedit"
			    value="save"
			    className="introsave"
			    name="save"
			  />
			 </div>
		        </form>
		      </div>
		    ) : (
	             <div className="userBio">{ubio}</div>
		    )
	           }
                </div>
              </div>
          </div>

          <div className="row2">
            <div className="userRecipes"
	         id="userRecipes"
	         onClick={handleSelected}>Recipes</div>
	    <div className="followingAuthors"
	         id="followingAuthors"
	         onClick={handleSelected}>Following ({followingNumber}) </div>
           </div>

	 </div>

	 <div className="section2" id="section2">
	   {
	    (selected === "recipes") ?
	    ( (urecipes.length > 0) ?
              urecipes.map((recipe, i) =>
                <div id={'mproId-' + i}
                     className="listitem"
                     data-animation-offset={i}>
                <p id="recipetext"
                   onClick={() => {
		   window.localStorage.setItem('mproId', 'mproId-' + i)
                   history.push('/viewrecipe', {recipe: recipe, type: 'myprofile'})}}>{recipe.title}</p>
                <Link
	          id="editlink"
	          to={{
	          pathname: "/add",
	          state: {
	            recipe: recipe,
	            type: "edit"
	          }
	        }}>Edit</Link>
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
            ) 
	    : 
	    (
	     <div>
	       {
	        followingNames.map((author, i) => 
	         <div className='followlist' id="followlist">
	          <Link
		    id="proflink"
		    to={{
		     pathname: `/profile/${author}`,
		     state: {
		       username: author,
		       following: true,
		       type: "myprofile"
		     }
		   }}>{author}</Link>
	          </div>
	        )
	       }
	     </div>
	    )
           }

	 </div>

       </div>
       <div className="bar"></div>
     </div>
   )
}

export default MyProfile
