import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './../Common.css'
import './Bookmarks.css'
import { ReactComponent as FoodLogo } from './../assets/food.svg'
import { ReactComponent as BackLogo } from './../assets/back.svg'
import retrieveService from '../../services/retrieve.js'
import helper from './../utils/helper.js'
import Loader from 'react-loader-spinner'

const Bookmarks = () => {

  const history = useHistory()

  const [ allBookmarks, setBookmarks ] = useState([])

  useEffect(() => {
     console.log("inside useeffect")
     let bookmarkArray
     retrieveService
	.getAllBookmarks()
	.then(returnedObject => {
	    console.log(returnedObject)
	    bookmarkArray = []
	    setBookmarks(bookmarkArray)
            bookmarkArray = [...returnedObject]
            console.log(bookmarkArray)
	    setBookmarks(bookmarkArray)
	    console.log(allBookmarks)
	    let beleId = window.localStorage.getItem('beleId')
	    let contId = 'bsection2'
	    helper.scrollfunc(beleId, contId)
            window.localStorage.setItem('beleId', 'bId-0')
	})

   }, [])

  const handleBack = () => {
     history.push('/home')
  }

  return (
    <div className="flex-container">
      <div className="Side">
	 <BackLogo className="backlogo" onClick={handleBack}/>
	 <div className="middle"></div>
	 <FoodLogo className="foodlogo"/>
      </div>
      <div className="content">
	<div className="bsection1">
	  <div id="allbookmarks">Bookmarks</div>
	</div>
	<div className="bsection2" id="bsection2">
         {
	  (allBookmarks.length > 0) ?
          allBookmarks.map((bookmark, i) =>
            <div 
	      id={'bId-' + i}
              className="listitem"
              onClick={()=>{
	       console.log(i)
	       window.localStorage.setItem('beleId', "bId-" + i)
	       console.log(window.localStorage.getItem('beleId'))
               history.push('/viewrecipe', { recipe: bookmark, type: "bookmarks" })
              }}>
              <p id="bookmarktext">{bookmark.title}</p>
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
      <div className="bar">
      </div>
    </div>
  )
}

export default Bookmarks
