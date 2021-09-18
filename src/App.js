import React, { useState, useEffect, lazy, Suspense } from 'react'
import Home from './components/Home'
import Add from './components/Add/Add'
import Drafts from './components/Drafts/Drafts'
import PublishDraft from './components/PublishDraft/PublishDraft'
import Bookmarks from './components/Bookmarks/Bookmarks'
import Viewrecipe from './components/Viewrecipe/Viewrecipe'
import MyProfile from './components/MyProfile/MyProfile'
import Profile from './components/Profile/Profile'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
  } from "react-router-dom"
  


const Login = lazy(() => import('./components/Login/Login'))
const Signup = lazy(() => import('./components/Signup/Signup'))
//const Home = lazy(() => import('./components/Home'))




const App = () => {
  
  const loggedInJSON = window.localStorage.getItem("loggedIn")
  const loggedInVal = Boolean(JSON.parse(loggedInJSON))
  const [ loggedIn, setLoggedIn ] = useState(
    () => Boolean(loggedInVal || false)
  )
   

  useEffect(() => {
    window.localStorage.setItem("loggedIn", loggedIn)
  }, [loggedIn])

  return (
    <Router>
      <Switch>
	    <Route exact path="/home">
	      {loggedIn ? <Home setLoggedIn={setLoggedIn} /> : <Redirect to="/" />}
        </Route>    
	    <Route exact path="/add">
	      {loggedIn ? <Add/> : <Redirect to="/" />}
	    </Route>   
	    <Route exact path="/drafts">
	      {loggedIn ? <Drafts/> : <Redirect to="/" />}
	    </Route>
	    <Route exact path="/publishdraft">
	      {loggedIn ? <PublishDraft/> : <Redirect to="/" />}
	    </Route>
	    <Route exact path="/bookmarks">
	      {loggedIn ? <Bookmarks/> : <Redirect to="/" />}
	    </Route>
	    <Route exact path="/viewrecipe">
	      {loggedIn ? <Viewrecipe/> : <Redirect to="/" />}
	    </Route>
	    <Route exact path="/myprofile">
	      {loggedIn ? <MyProfile/> : <Redirect to="/" />}
	    </Route>
	    <Route exact path="/profile/:username">
	      {loggedIn ? <Profile/> : <Redirect to="/" />}
	    </Route>
		<Suspense fallback={<div>Loading page...</div>}>
	    <Route exact path="/">
	      <Login setLoggedIn={setLoggedIn} /> 
	    </Route>
	    <Route exact path="/signup">
	      <Signup/>
	    </Route>
		</Suspense>
      </Switch>
    </Router>
  )
}

export default App
