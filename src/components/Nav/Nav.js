import React from 'react'
import { useHistory } from 'react-router-dom'
import './Nav.css'
import { ReactComponent as LogoutLogo } from './../assets/logout.svg'
import { ReactComponent as ProfileLogo } from './../assets/profile.svg'
import { ReactComponent as AddLogo } from './../assets/add.svg'
import { ReactComponent as DraftLogo } from './../assets/drafts.svg'
import { ReactComponent as BookmarkLogo } from './../assets/bookmark.svg'
import helper from './../utils/helper.js'

const Nav = ({ setLoggedIn }) => {

  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.setItem(
      'token', 'null'
    )
    window.localStorage.setItem(
      'loggedIn', 'false'
    )

    setLoggedIn(false)
    history.push('/')
    window.localStorage.clear()
    helper.showtoast("Logged out!!")
  }

  const handleMyProfile = () => {
     history.push('/myprofile')
  }

  const handleAdd = () => {
     history.push('/add')
  }

  const handleDraft = () => {
     history.push('/drafts')
  }

  const handleBookmark = () => {
     history.push('/bookmarks')
  }

  return (
    <div className="nav">
      <LogoutLogo className="logout" onClick={handleLogout}/>
      <ProfileLogo className="profile" onClick={handleMyProfile}/>
      <AddLogo className="add" onClick={handleAdd}/>
      <DraftLogo className="draft" onClick={handleDraft}/>
      <BookmarkLogo className="bookmark" onClick={handleBookmark}/>
    </div>
  )
}

export default Nav
