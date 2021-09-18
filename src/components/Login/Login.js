import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './Login.css'
import loginService from '../../services/login.js'
import tokenService from '../../services/token.js'
import helper from './../utils/helper.js'

const Login = ({ setLoggedIn }) => {
  
  const [ username, setUsername ] = useState('')

  const [ password, setPassword ] = useState('')

  const history = useHistory()

  const handleUsernameChange = (event) => {
     setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
     setPassword(event.target.value)
  }

  const handleLogin = (event) => {
     console.log('inside handle login')
     event.preventDefault()

     const credObject = {
       username: username.trim(),
       password: password.trim(),
     }

     console.log(loginService.login)

     loginService
       .login(credObject)
       .then(returnedObject => {
	         console.log(returnedObject)
             if (returnedObject) {
	            setLoggedIn(true)
	            tokenService.setToken(returnedObject.token)
		        window.localStorage.setItem(
		             'loggedIn', 'true'
	         	)
		        window.localStorage.setItem(
		            'loggedUser', username
		        )
		        helper.showtoast("Login Successful!!")
		        history.push('/home')
	        } else {
	            console.log('error while loggin in')
		        helper.showtoast("Invalid Credentials!!")
	        }
       })
  }

  return (
   <div className="login">
     <div className="heading">COOKBOOK</div>
     <div className="subheading">A Food Recipe Sharing Application</div>
     <div className="lformcontainer">
    <form onSubmit={handleLogin}>
    <label htmlFor="username" className="loglabel">Username</label>
	<input
	   type="text"
	   name="username"
	   id="username"
	   value={username}
	   onChange={handleUsernameChange}
	 />
	 <label htmlFor="password" className="loglabel">Password</label>
	 <input
	   type="password"
	   name="password"
	   id="password"
	   value={password}
	   onChange={handlePasswordChange}
	 />
	 <input
	   type="submit"
	   id="login"
	   value="Login"
	   name="submit"
	 />
	 <Link id="slink" to="/signup">Sign Up</Link>
    </form>
    </div>
   </div>
  )
}

export default Login
