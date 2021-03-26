import React, { useState } from 'react'
import './Signup.css'
import signupService from '../../services/signup.js' 
import helper from './../utils/helper.js'

const Signup = () => {
  
  const [ username, setUsername ] = useState('')

  const [ password, setPassword ] = useState('')

  const [ confpassword, setConfpassword ] = useState('')

  let passwordmatch = false

  const [ bio, setBio ] = useState('')

  const handleUsernameChange = (e) => {
    console.log(username)
    setUsername(e.target.value)
  }	

  const handlePasswordChange = (e) => {
    console.log(password)
    setPassword(e.target.value)
  }

  const handleConfpasswordChange = (e) => {
    console.log(confpassword)
    setConfpassword(e.target.value)
  }

  const handleBioChange = (e) => {
    console.log(bio)
    setBio(e.target.value)
  }

  const handleSignup = (e) => {
     console.log('inside handle signup')
     e.preventDefault()
     const userObject = {
       username: username,
       password: password,
       bio: bio
     }

     if (confpassword !== password) {
        passwordmatch=false
        helper.showtoast("Passwords don't match!!")
     } else {
        passwordmatch=true
     }

     if(passwordmatch){
       signupService
	 .signup(userObject)
	 .then(returnedUser => { 
            setUsername('')
	    setPassword('')
	    setConfpassword('')
	    setBio('')		 
	    if(!returnedUser) {
	       helper.showtoast("A user with that username already exists. Please try again!!")
	    } else {
	       console.log("signup successful")
	       helper.showtoast("Signup Successful!!")
	    }
	 })
         .catch(err => console.log(err))
     }
  }

  return (
    <div className="signup">
       <div className="sformcontainer">
	<form onSubmit={handleSignup}>
         <label 
	    htmlFor="susername" 
	    className="slabel">Username</label>
         <input
           type="text"
           name="username"
           id="susername"
           value={username}
           onChange={handleUsernameChange}
	   required
         />
         <label 
	    htmlFor="spassword" 
	    className="slabel">Password</label>
         <input
           type="password"
           name="password"
           id="spassword"
           value={password}
           onChange={handlePasswordChange}
	   required
         />
         <label 
	    htmlFor="sconfpassword" 
	    className="slabel">Confirm Password</label>
         <input
           type="password"
           name="confpassword"
           id="sconfpassword"
           value={confpassword}
           onChange={handleConfpasswordChange}
	   required
         />
	 <label 
	    htmlFor="sbio"
	    className="slabel">Bio</label>
	 <textarea
	   type="text"
	   name="bio"
	   id="sbio"
	   value={bio}
	   onChange={handleBioChange}
	 />
         <input
           type="submit"
	   className="ripple"
           id="ssignup"
           value="Signup"
           name="submit"
         />
        </form>
      </div>
    </div>
  )
}

export default Signup
