import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './../Common.css'
import './Viewrecipe.css'
import { ReactComponent as FoodLogo } from './../assets/food.svg'
import { ReactComponent as BackLogo } from './../assets/back.svg'
import { ReactComponent as BookmarkLogo } from './../assets/bookmark.svg'
import bookmarkService from '../../services/bookmark.js'
import helper from './../utils/helper.js'

const Viewrecipe = () => {

  const history = useHistory()
 
  const location = useLocation()

  const currentrecipe = location.state.recipe

  const ingredients = currentrecipe.ingredients

  console.log(currentrecipe)
 
  const type = location.state.type

  console.log(type)

  const handleBack = () => {

     history.goBack()
    
  }

  const handleBookmark = () => {
     console.log(currentrecipe.id)

     const bookmarkId = {
        bmarkid: currentrecipe.id
     }

     bookmarkService.addbookmark(bookmarkId)
	                 .then(returnedObject => {
		                 console.log(returnedObject)
		                 if (returnedObject === null) {
		                     helper.showtoast("Bookmark Removed!!")
		                 } else {
		                     helper.showtoast("Bookmark Added")
		                }
		              })
  }

  console.log(currentrecipe)
  console.log(ingredients)

  return (
    <div className="flex-container">
      <div className="Side">
         <BackLogo className="backlogo" onClick={handleBack}/>
         <div className="middle"></div>
         <FoodLogo className="foodlogo"/>
      </div>
      <div className="content">
        <div className="viewrecipe">
	        <div id="title" className="title">{currentrecipe.title}</div>
	        <div id="author" className="author"><i>- {currentrecipe.author}</i></div>
	        <div id="foodimage" className="foodimage">
	         <img 
	           src={currentrecipe.photo} 
	           alt="Not Available"
	           id="recipephoto"/>
	         </div>
	         <div id="cuisine" className="cuisine"><b>Cuisine:</b> {currentrecipe.cuisine.charAt(0).toUpperCase() + currentrecipe.cuisine.substring(1)}</div>
	         <div id="meal" className="meal"><b>Meal:</b> {currentrecipe.meal}</div>
	         <div id="course" className="course"><b>Course:</b> {currentrecipe.course}</div>
	         <div id="ingredients" className="ingredients"><b>Ingredients:</b></div>
	         {
	          ingredients.map((ingredient, i) => 
	            <div id={"Ing-" + i} className="ingredient">
	              <div className="Name" id="Name">{helper.capitalizeFirst(ingredient.name)}:</div>	
	              <div className="Quantity" id="Quantity">{ingredient.quantity}</div>
	            </div>
	          )
	         }
	        <div id="methodheading" className="methodheading"><b>Method:</b></div>
	        <div id="method" className="recipemethod">{currentrecipe.method}</div>
	 </div>
   </div>
   <div className="bar">
	  <BookmarkLogo className="bookmarklogo" onClick={handleBookmark}/>
   </div>
   </div>
  )
}

export default Viewrecipe


