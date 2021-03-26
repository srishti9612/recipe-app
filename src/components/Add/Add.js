import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
//import { toast } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css'
import './../Common.css'
import './Add.css'
import { ReactComponent as FoodLogo } from './../assets/food.svg'
import { ReactComponent as BackLogo } from './../assets/back.svg'
import addService from '../../services/add.js'
import draftService from '../../services/draft.js'
import editService from '../../services/edit.js'
import deleteService from '../../services/delete.js'
import helper from './../utils/helper.js'

//toast.configure()

const Add = () => {

   console.log(addService.addrecipe)

   const meals = ["Select","Dinner", "Breakfast", "Lunch", "Snack", "Any"]
  
   const courses = ["Select", "Soup", "Starters", "Accompaniments", "Main Course", "Dessert"] 

   const [ title, setTitle ] = useState('')

   const [ cuisine, setCuisine ] = useState('')

   const [ meal, setMeal ] = useState('')

   const [ course, setCourse ] = useState('')

   const [ method, setMethod ] = useState('')

   const [ picture, setPicture ] = useState('') 

   const blankIngredient = { name: '', quantity: '' }

   const [ ingredient, setIngredient ] = useState([
	  { ...blankIngredient },
   ])

   const [ type, setType ] = useState('')

   const [ recipeId, setId ] = useState('')

   //const [ editrecipe, setEditrecipe ] = useState('')

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

   const myForm = useRef()

   const history = useHistory()

   const location = useLocation()

   console.log(location)

   let  editrecipe

   useEffect(() => {
    if (location.state) {
       setType(location.state.type)
       editrecipe = location.state.recipe
       setId(editrecipe.id)
       //setEditrecipe(location.state.recipe)
       setTitle(editrecipe.title)
       setCuisine(editrecipe.cuisine)
       setMeal(editrecipe.meal)
       setCourse(editrecipe.course)
       setIngredient(editrecipe.ingredients)
       setMethod(editrecipe.method)
       setPicture(editrecipe.photo)
       console.log(editrecipe.photo)
    }
   }, [])

   const handleTitleChange = (e) => {
     console.log(title)
     setTitle(e.target.value)
   }

   const handlePictureChange = (e) => {
      console.log(e.target.files[0])
      setPicture(e.target.files[0])
      console.log(picture)
      if (e.target.files[0]) {
      setImgPreview({
        file: URL.createObjectURL(e.target.files[0])
      }) } else {
        setImgPreview({
	  file: null
	})
      }
      console.log(picture)
      console.log("Image preview file value")
      console.log(e.target.files[0])
      console.log(imgPreview.file)
   }

   const handleMethodChange = (e) => {
     console.log(method)
     setMethod(e.target.value)
   }

  
   const handleRemove = (e) => {
     console.log(e.target.dataset.idx)
     let index = e.target.dataset.idx
     let ing = [...ingredient]
     if (ing.length > 1) {
      ing.splice(index,1)
     }
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

   const addIngredient = () => {
     setIngredient([...ingredient, { ...blankIngredient }])
   }

   const handleIngredientChange = (e) => {
     const updatedIngredients = [...ingredient]
     updatedIngredients[e.target.dataset.idx][e.target.className] = e.target.value
     setIngredient(updatedIngredients)
   }

   const handleBack = () => {
     console.log(type)
     if (type === "edit") {
       history.push('/myprofile')  
     } else { 
       history.push('/home') 
     }
   }

   const handleSubmit = (event) => {

     event.preventDefault()

     let buttonId = myForm.current.buttonId
	  
     if (buttonId === "publish") {
       
       console.log(myForm.current.buttonId)
       console.log(addService.addrecipe)

       const newRecipe = {
	       title: title,
	       cuisine: cuisine,
	       meal: meal,
	       course: course,
	       ingredients: ingredient,
	       method: method,
	       photo: picture,
       }

       console.log(newRecipe)

       let validation = helper.recipevalfunc(newRecipe)
       console.log(validation)
       console.log(validation.result)

       setIsEmpty(validation.valObj)
 
       if (validation.result) {
         const formData = new FormData()
         formData.append('title', title)
         formData.append('cuisine', cuisine)
         formData.append('meal', meal)
         formData.append('course', course)
         formData.append('ingredients', JSON.stringify(ingredient))
         formData.append('method', method)
         formData.append('photo', picture)

         console.log(...formData)
   
         addService.addrecipe(formData)
	           .then(returnedObject => {
		      console.log(returnedObject)
		      if (returnedObject['err']) {
		        helper.showtoast('A recipe with that title already exists')
		      } else {
		        helper.showtoast('Recipe Published!!')
		        history.push('/home')
		      }
		   })
       }	 
     } 
	   
     if (buttonId === "savedraft") {
       
       console.log(myForm.current.buttonId)
       //console.log(addService.addrecipe)
	//add a service for drafts
       const newDraft = {
            title: title,
            cuisine: cuisine,
	    meal: meal,
	    course: course,
            ingredients: ingredient,
            method: method,
	    photo: picture
       }

       const formData = new FormData()
       formData.append('title', title)
       formData.append('cuisine', cuisine)
       formData.append('meal', meal)
       formData.append('course', course)
       formData.append('ingredients', JSON.stringify(ingredient))
       formData.append('method', method)
       formData.append('photo', picture)

       console.log("new draft")
       console.log(newDraft)

       console.log(...formData)
	
       draftService.adddraft(formData)
	           .then(returnedObject => {
		       console.log(returnedObject)
		       if(returnedObject['err']) {
		          window.alert(returnedObject.err)
		       } else {
			 helper.showtoast("Saved as Draft!!")
			 history.push('/drafts')
		       }
		   })
     }

     if (buttonId === "update") {
       /// add a service to update recipe
       console.log(myForm.current.buttonId) 
       
       const editedRecipe = {
	    _id: recipeId,
            title: title,
            cuisine: cuisine,
	    meal: meal,
	    course: course,
            ingredients: ingredient,
	    method: method,
	    photo: picture
       }

       let validation = helper.recipevalfunc(editedRecipe)
       console.log(validation)
       console.log(validation.result)

       setIsEmpty(validation.valObj)

       if (validation.result) {
         const formData = new FormData()
         formData.append('_id', editedRecipe._id)
         formData.append('title', editedRecipe.title)
         formData.append('cuisine', editedRecipe.cuisine)
         formData.append('meal', editedRecipe.meal)
         formData.append('course', editedRecipe.course)
         formData.append('ingredients', JSON.stringify(editedRecipe.ingredients))
         formData.append('method', editedRecipe.method)
         formData.append('photo', editedRecipe.photo)

         console.log(...formData)

         editService.editrecipe(formData)
	            .then(returnedObject => {
		        console.log(returnedObject)
			helper.showtoast("Recipe Updated!!")
		    })
       }
     }

     if (buttonId === "delete") {
       deleteService.deleterecipe(recipeId)
	            .then(returnedObject => {
		       console.log(returnedObject)
		       helper.showtoast("Recipe Deleted!!")
		       history.push('/myprofile')
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
        <form onSubmit={handleSubmit} ref={myForm} encType='multipart/form-data'>
	  <div className='labeldiv'>
	   <label htmlFor="title" className="addlabels">Title</label>
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
	   (picture !== '') ? 
	   (
	    <div>
	      <input
		type="button"
		id="changephoto"
		name="Change Photo"
		value="Change Photo"
		onClick={() => {
		   setPicture('')
		   setImgPreview({file: null})
		}}/>
		<div>
		  {
		    (imgPreview.file === null) ?
		    (
		      <img src={picture} alt="Not Available" />
		    ) : (
		      <img src={imgPreview.file} alt="Not Available" />
		    )
		  }
		</div>
	    </div>
	   ) : (
	     <div>
	       <div>
		 <input
		    type="file"
		    name="picture"
		    id="picture"
		    onChange={handlePictureChange}/>
	       </div>
	       <div>
		 <img
		   src={imgPreview.file}
		   id="imagepreveiw"
		   alt="Not Available"/>
	       </div>
	     </div>
	   )
	  }
	  <div className="labeldiv">
	   <label htmlFor="cuisine" className="addlabels">Cuisine</label>
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
	   <label htmlFor="meals" className="addlabels">Meals</label>
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
	   <label htmlFor="courses" className="addlabels">Courses</label>
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
	  <div className='labeldiv'>
	   <div className="ingheading"><b>Ingredients:</b></div>
	   {(isEmpty.ingredients) ? (<p className="required">Required</p>):(<></>)}
	  </div>
	  {
	    ingredient.map((val, idx) => {
	      const ingId = `name-${idx}`
	      const quaId = `qua-${idx}`
	      const remId = `rem-${idx}`
              
	      return (
	          <div key={`ing-${idx}`} className="fadeInAnimation">
		      <label htmlFor={ingId} className="addlabels">{'Name: '}</label>
		      <input 
		        type="text"
		        name={ingId}
		        data-idx={idx}
		        id={ingId}
		        className="name"
		        value={ingredient[idx].name}
		        onChange={handleIngredientChange}
		      />
		      <label htmlFor={quaId} className="addlabels">{'Quantity: '}</label>
		      <input
		         type="text"
		         name={quaId}
		         data-idx={idx}
		         id={quaId}
		         className="quantity"
		         value={ingredient[idx].quantity}
		         onChange={handleIngredientChange}
		      />
		      <input 
		         type="button"
i		         name="remove"
		         data-idx={idx}
		         id={remId}
		         className="removebutton"
		         onClick={handleRemove}
		      />
		  </div>
	      )
	    })
	  }
	  <div className="addmore">
	    <label htmlFor="new" 
	           className="newlabel">Add More</label>
	    <input
              id="new"
	      className="addbutton"
              type="button"
              onClick={addIngredient}
            />
	  </div>
	  <div className="labeldiv">
	   <label htmlFor="method" className="addlabels">Method</label>
	   {(isEmpty.method) ? (<p className="required">Required</p>):(<></>)}
	  </div>
	  <textarea 
	     id="method"
	     value={method}
	     onChange={handleMethodChange}
	  />
	  {/* if type is edit then display update instead of publish
	      display update instead of publish
	      display a delete button
	      don't display save as draft */}
          { (type === "edit") ?
	    ( <>
	      <input
		type="submit"
		id="update"
		className="update"
		value="Update"
		name="update"
		onClick={e => myForm.current.buttonId=e.target.id}
	      />
	      <input
		type="submit"
		id="delete"
		className="delete"
		value="Delete"
		name="delete"
		onClick={e => myForm.current.buttonId=e.target.id}
	      />
	      </>
	    ) :
	    (
	      <>	    
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
	        id="savedraft"
	        className="savedraft"
	        value="Draft"
	        name="draft"
	        onClick={e => myForm.current.buttonId=e.target.id}
	      />
	      </>
	    )
	  }
	</form>
       </div>

       <div className="bar">
       </div>
    </div>
  )
}

export default Add
