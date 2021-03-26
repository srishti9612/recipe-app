import React, { useState, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './../Common.css'
import './PublishDraft.css'
import { ReactComponent as FoodLogo } from './../assets/food.svg'
import { ReactComponent as BackLogo } from './../assets/back.svg'
import draftService from '../../services/draft.js'
import deleteService from '../../services/delete.js'
import helper from './../utils/helper.js'

/* note - Display a photo in photo preview mode and give a change photo option */
const PublishDraft = () => {

  const location = useLocation()

  const history = useHistory()

  const myForm = useRef()

  const currentdraft = location.state.draft

  const meals = ["Select", "Dinner", "Breakfast", "Lunch", "Snack", "Any"]

  const courses = ["Select", "Soup", "Starters", "Accompaniments", "Main Course", "Dessert"]

  const [ title, setTitle ] = useState(currentdraft.title)

  const [ cuisine, setCuisine ] = useState(currentdraft.cuisine)

  const [ meal, setMeal ] = useState(currentdraft.meal)

  const [ course, setCourse ] = useState(currentdraft.course)

  const [ method, setMethod ] = useState(currentdraft.method)

  const ingredients = currentdraft.ingredients

  const [ ingredient, setIngredient ] = useState(ingredients)

  const [ photo, setPhoto ] = useState(currentdraft.photo)

  const [ imgPreview, setImgPreview ] = useState({
     file: null
  })

  const [ isEmpty, setIsEmpty ] = useState({
      title: false,
      cuisine: false,
      meal: false,
      course: false,
      ingredients: false,
      method: false
   })


  const handleBack = () => {
    history.push('/drafts')
  }

  const handleTitleChange = (e) => {
    console.log(title)
    setTitle(e.target.value)
  }

  const handleMethodChange = (e) => {
     console.log(method)
     setMethod(e.target.value)
  }

  const handleRemove = (e) => {
     console.log(e.target.dataset.idx)
     let index = e.target.dataset.idx
     let ing = [...ingredient]
     ing.splice(index,1)
     setIngredient(ing) 
  }

  const handleCuisineChange = (e) => {
     console.log(cuisine)
     setCuisine(e.target.value)
  }

  const handleMealChange = (e) => {
     console.log(meal)
     setMeal(e.target.value)
  }

  const handleCourseChange = (e) => {
     console.log(course)
     setCourse(e.target.value)
  }

  const blankIngredient = { name: '', quantity: ''}

  const addIngredient = () => {
    setIngredient([...ingredient, { ...blankIngredient }])
  }

  const handleIngredientChange = (e) => {
    const updatedIngredients = [...ingredient]
    updatedIngredients[e.target.dataset.idx][e.target.className] = e.target.value
    setIngredient(updatedIngredients)
  }

  const handleImageChange = (e) => {
     e.preventDefault()
     console.log("Inside handle Image change")
     console.log(e.target.files[0])
     setPhoto(e.target.files[0])
     console.log(photo)
     if (e.target.files[0]) {
       setImgPreview({
          file: URL.createObjectURL(e.target.files[0])
       })
     } else {
       setImgPreview({
         file: null
       })
     }

     console.log("Image preview file value")
     console.log(e.target.files[0])
     console.log(imgPreview.file)
  }

  const handleSubmit = (event) => {
     
    event.preventDefault()

    let buttonId = myForm.current.buttonId

    const updatedDraft = {
               _id: currentdraft.id,
               title: title,
               cuisine: cuisine,
               meal: meal,
               course: course,
               ingredients: ingredient,
               method: method,
               photo: photo
          }

    const formData = new FormData()

    formData.append('_id', updatedDraft._id)
    formData.append('title', updatedDraft.title)
    formData.append('cuisine', updatedDraft.cuisine)
    formData.append('meal', updatedDraft.meal)
    formData.append('course', updatedDraft.course)
    formData.append('ingredients', JSON.stringify(updatedDraft.ingredients))
    formData.append('method', updatedDraft.method)
    formData.append('photo', updatedDraft.photo)

    console.log(...formData)

    if (buttonId === "publish") {
       console.log(myForm.current.buttonId)
      
       // 1. add validation 2. Redirect to home
	   
       let validation = helper.recipevalfunc(updatedDraft)
       console.log(validation)
       console.log(validation.result)

       setIsEmpty(validation.valObj)


       if (validation.result) {

         draftService.publishdraft(formData)
	             .then(returnedObject => {
			if (returnedObject['err']) {
			   helper.showtoast('A recipe with that title already exists')
			} else {
		         console.log(returnedObject)
			 helper.showtoast('Recipe Published!!')
			 history.push('/home')
		        }
		     })
       }

    } else if (buttonId === "updateDraft") {
       console.log(myForm.current.buttonId)

       console.log(updatedDraft)

       // 1. Give alert for successful update

       draftService.updatedraft(formData)
	           .then(returnedObject => {
		      console.log(returnedObject)
		      helper.showtoast('Draft Updated!!')
		   })
    } else {
       console.log(myForm.current.buttonId)

      // Redirect to drafts after alert
       let draftId = currentdraft.id

       deleteService.deletedraft(draftId)
	            .then(returnedObject => {
		       console.log(returnedObject)
		       helper.showtoast("Draft Deleted!!")
		       history.push('/drafts')
		    })
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
	<form onSubmit={handleSubmit} ref={myForm}>
	  <div className="labeldiv">
	    <label htmlFor="title" className="draftlabels">Title</label>
	    {(isEmpty.title) ? (<p className="required">Required</p>) : (<></>)}
	  </div>
	  <input
	    type="text"
	    name="title"
	    id="title"
	    value={title}
	    onChange={handleTitleChange}
	  />
	  {
	   (photo !== '') ?
	   (<div>
	     <input
	       type="button"
	       id="changephoto"
	       name="Change Photo"
	       value="Change Photo"
	       onClick={() => {
		              setPhoto('') 
		              setImgPreview({file: null})}}/>
	     <div>
	       { 
		 (imgPreview.file === null) ? 
		 (
		   <img src={photo} alt="Not Available"/>
	         ) : (
		   <img src={imgPreview.file} alt="Not Available"/>
		 )
	       }
             </div>
            </div>
	   ) : (
           <div>
	    <div>
	      <input
	        type="file"
	        name="image"
	        id="image"
	        onChange={handleImageChange}
	      />
	     </div>
	     <div>
               <img
	         src={imgPreview.file}
		 alt="None"
	         id="imagepreview" />
             </div>
	    </div>
	   )
          }
	  <div className="labeldiv">
	    <label htmlFor="cuisine" className="draftlabels">Cuisine</label>
	    {(isEmpty.cuisine) ? (<p className="required">Required</p>) : (<></>)}
	  </div>
          <input
            type="text"
            name="cuisine"
            id="cuisine"
            value={cuisine}
            onChange={handleCuisineChange}
          />
	  <div className="labeldiv">
	    <label htmlFor="meals" className="draftlabels">Meals</label>
	    {(isEmpty.meal) ? (<p className="required">Required</p>):(<></>)}
	  </div>
	  <select
	    id="meals"
	    name="meals"
	    value={meal}
	    onChange={handleMealChange}>
	    {
	      meals.map((meal) => {
	        return (
		   <option key={meal}>
                       {meal}
		   </option>
		)
	      })
	    }
	  </select>
	  <div className="labeldiv">
	    <label htmlFor="courses" className="draftlabels">Courses</label>
	    {(isEmpty.course) ? (<p className="required">Required</p>) : (<></>)}
	  </div>
	  <select
	    id="courses"
	    value={course}
	    onChange={handleCourseChange}>
	    {
	      courses.map((course) => {
	        return (
		   <option key={course}>
		         {course}
		   </option>
		)
	      })   
	    }
	  </select>
	  <div className="labeldiv">
	    <div className="ingheading"><b>Ingredients:</b></div>
	    {(isEmpty.ingredients) ? (<p className="required">Required</p>):(<></>)}
	  </div>
	  {
	    ingredient.map((val, idx) => {
	        const ingId = `name-${idx}`
		const quaId = `qua-${idx}`
		const remId = `rem-${idx}`

		return (
		    <div key={`cat-${idx}`} className="fadeInAnimation">
                       <label htmlFor={ingId} 
			      className="draftlabels">{'Name: '}</label>
		       <input
			 type="text"
			 name={ingId}
			 data-idx={idx}
			 id={ingId}
			 className="name"
			 value={ingredient[idx].name}
			 onChange={handleIngredientChange}
                       />
		       <label htmlFor={quaId}
			      className="draftlabels">{'Quantity: '}</label>
		       <input
			 type="text"
			 name="quaId"
			 data-idx={idx}
			 id={quaId}
			 className="quantity"
			 value={ingredient[idx].quantity}
			 onChange={handleIngredientChange}
		       />
		       <input
			 type="button"
			 className="removebutton"
			 name="remove"
			 data-idx={idx}
			 id={remId}
			 onClick={handleRemove}
		       />
		    </div>
		)
	    })
	  }
	  <div className="addmore">
	   <label htmlFor="new" className="newlabel">Add More</label>
	    <input
	      id="new"
	      className="addbutton"
	      type="button"
	      onClick={addIngredient}
	    />
	  </div>
	  <div className="labeldiv">
	    <label htmlFor="method" className="draftlabels">Method</label>
	    {(isEmpty.method) ? (<p className="required">Required</p>):(<></>)}
	  </div>
	  <textarea
	     id="method"
	     value={method}
	     onChange={handleMethodChange}
	  />
	  <input
	     type="submit"
	     id="publish"
	     className="publish"
	     value="Publish"
	     name="publish"
	     onClick={e => myForm.current.buttonId=e.target.id}
	  />
	  <input
	     type="submit"
	     id="updateDraft"
	     className="updateDraft"
	     value="Update"
	     name="updateDraft"
	     onClick={e => myForm.current.buttonId=e.target.id}
	  />
	  <input
	     type="submit"
	     id="deleteDraft"
	     className="deleteDraft"
	     value="Delete"
	     name="deletedraft"
	     onClick={e => myForm.current.buttonId=e.target.id}
	  />
	</form>
      </div>

      <div className="bar">
      </div>
    </div>
  )
}

export default PublishDraft
