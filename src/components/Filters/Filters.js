import React, { useState, useEffect, useContext, useRef } from 'react'
import { FilterContext } from './../utils/FilterContext'
import './Filters.css'

const Filters = () => {

  const { filter, setFilter } = useContext(FilterContext)

  console.log(filter)

  //You want to pre-populate the filter if it is already set. So retrieve the 
  //Obejct from localStorage over here.

  const blank = ""

  const initCheckedVal = {
      Breakfast: false,
      Lunch: false,
      Dinner: false,
      Snack: false,
      Any: false
  }

  const initDisabledVal = {
     Breakfast: false,
     Lunch: false,
     Dinner: false,
     Snack: false,
     Any: false
  }
  
  const [ cuisines, setCuisines ] = useState([blank])
	  
  const [ ingredients, setIngredients ] = useState([blank])

  const [ xcuisines, setXcuisines ] = useState([blank]) 

  const [ xingredients, setXingredients ] = useState([blank]) 

  const mealValues = ["Breakfast", "Lunch", "Dinner", "Snack", "Any"]

  const [ isCheckedMeal, setIsCheckedMeal ] = useState(initCheckedVal)

  const [ isCheckedXmeal, setIsCheckedXmeal ] = useState(initCheckedVal)

  const [ isDisabledMeal, setIsDisabledMeal ] = useState(initDisabledVal)

  const [ isDisabledXmeal, setIsDisabledXmeal ] = useState(initDisabledVal)

  const myForm = useRef()

  let selectedMeals =  []

  let selectedXmeals = []

  console.log(ingredients)


  /// add a useEffect hook here to prepopulate filter if it is already set

  useEffect(() => {
     let filterObj = JSON.parse(window.localStorage.getItem('filter'))

     if (filterObj) {
        setIngredients(filterObj.ingredients)

	setCuisines(filterObj.cuisines)

	setIsCheckedMeal({
	   Breakfast: filterObj.meals.includes("Breakfast"),
	   Lunch: filterObj.meals.includes("Lunch"),
	   Dinner: filterObj.meals.includes("Dinner"),
	   Snack: filterObj.meals.includes("Snack"),
	   Any: filterObj.meals.includes("Any")
	})
	
	setXingredients(filterObj.xingredients)

	setXcuisines(filterObj.xcuisines)

	setIsCheckedXmeal({
	   Breakfast: filterObj.xmeals.includes("Breakfast"),
           Lunch: filterObj.xmeals.includes("Lunch"),
	   Dinner: filterObj.xmeals.includes("Dinner"),
	   Snack: filterObj.xmeals.includes("Snack"),
	   Any: filterObj.xmeals.includes("Any")
	})
     }

  }, [])

  const handleSubmit = (e) => {

   e.preventDefault()

   const buttonId = myForm.current.buttonId
   console.log(buttonId)

   if (buttonId === "submitfilter") {
       e.preventDefault()
       console.log("inside submit")
       console.log(e.target.name)
       //you will probably have to write code to save all the details 
	  //inside filter context variable and then save this value to
	  //localstorage and then send that filter variable along with 
	  //get all request so that you can use to filter the feed.
       for(let i=0; i<mealValues.length; i++) {
          if(isCheckedMeal[mealValues[i]]) {
             selectedMeals.push(mealValues[i])
          }
       }

       if(selectedMeals.length === 0) {
          selectedMeals.push("")
       }

       for(let i=0; i<mealValues.length; i++) {
          if(isCheckedXmeal[mealValues[i]]) {
             selectedXmeals.push(mealValues[i])
          }
       }

       if(selectedXmeals.length === 0) {
          selectedXmeals.push("")
       }

       console.log("selectedMeals")
       console.log(selectedMeals)

       console.log("selectedXmeals")
       console.log(selectedXmeals)
	 
       let filterObject = {
            ingredients: ingredients,
            xingredients: xingredients,
            cuisines: cuisines,
            xcuisines: xcuisines,
            meals: selectedMeals,
            xmeals: selectedXmeals
          }

       console.log(filterObject)

       if( filterObject.ingredients === '' && filterObject.xingredients === '' 
           && filterObject.cuisines === '' && filterObject.xcuisines === '' 
           && filterObject.meals === '' && filterObject.xmeals === '') {
	   window.localStorage.setItem('filter', JSON.stringify(null))
           setFilter(null)
       } else {
         window.localStorage.setItem('filter', JSON.stringify(filterObject))
         setFilter(filterObject)
       }
       console.log(filter)
    }

    if (buttonId === "clearfilter") {
       console.log("Inside Clear Filter")
       window.localStorage.setItem('filter', JSON.stringify(null))
       let filterObject = null
       setFilter(filterObject)
       console.log("value of filter after clear")
       console.log(filter)
       setIngredients([blank])
       setXingredients([blank])
       setCuisines([blank])
       setXcuisines([blank])
       setIsCheckedMeal(initCheckedVal)
       setIsCheckedXmeal(initCheckedVal)
    }
  }

  const handleAddIngredients = (e) => {
     e.preventDefault()
     setIngredients([blank, ...ingredients])  
  }

  const handleAddXingredients = (e) => {
     e.preventDefault()
     setXingredients([blank, ...xingredients])
  }

  const handleAddCuisines = (e) => {
     e.preventDefault()
     setCuisines([blank, ...cuisines])
  }

  const handleAddXcuisines = (e) => {
     e.preventDefault()
     setXcuisines([blank, ...xcuisines])
  }

  const handleIngChange = (e) => {
     const updIngs = [...ingredients]
     console.log(updIngs)
     updIngs[e.target.dataset.idx] = e.target.value
     setIngredients(updIngs)
  }


  const handleXingChange = (e) => {
     const updIngs = [...xingredients]
     console.log(updIngs)
     updIngs[e.target.dataset.idx] = e.target.value
     setXingredients(updIngs)
  }

  const handleCuisineChange = (e) => {
    const updCuisines = [...cuisines]
    console.log(updCuisines)
    updCuisines[e.target.dataset.idx] = e.target.value
    setCuisines(updCuisines)
  } 

  const handleXcuisineChange = (e) => {
    const updCuisines = [...xcuisines]
    console.log(updCuisines)
    updCuisines[e.target.dataset.idx] = e.target.value
    setXcuisines(updCuisines)
  }


  const handleSingleCheckMeal = (e) => {  
    setIsCheckedMeal({ ...isCheckedMeal, [e.target.name]: e.target.checked })
    setIsDisabledXmeal({ ...isDisabledXmeal, [e.target.name]: e.target.checked})   
  }

  const handleSingleCheckXmeal = (e) => {
    setIsCheckedXmeal({ ...isCheckedXmeal, [e.target.name]: e.target.checked })
    setIsDisabledMeal({ ...isDisabledMeal, [e.target.name]: e.target.checked })
  }

  const handleDelete = (e) => {
     console.log(e.target.name)

     let index = e.target.dataset.idx

     let name = e.target.name
     
     if (name === "delIng") {

       let ing = [...ingredients]

       if (ing.length > 1) {
         ing.splice(index, 1)
         setIngredients(ing)
       }
     
     } else if (name === "delXing") {

       let xing = [...xingredients]

       if (xing.length > 1) {
          xing.splice(index, 1)
	  setXingredients(xing)
       }
     
     } else if (name === "delCuis") {

       let cuis = [...cuisines]

       if (cuis.length > 1) {
          cuis.splice(index, 1)
	  setCuisines(cuis)
       }
     
     } else if (name === "delXcuis") {

       let xcuis = [...xcuisines]

       if (xcuis.length > 1) {
         xcuis.splice(index, 1)
	 setXcuisines(xcuis)
       }
     
     } 
  }

  return (
     <div id="filterdiv">

         <form onSubmit={handleSubmit} className="filterform" ref={myForm}>
           
	   <label htmlFor="includeingred" id="inglabel">Include Ingredients</label>
           <div id="includeingred">
           {
             ingredients.map((val, idx) => {
                 
	         const ingId = `ing-${idx}`
	         const remId = `rem-${idx}`

	         return (
	           <div className="filterinputs">
	              <input 
		         type="text"
		         name={ingId}
		         data-idx={idx}
		         id={ingId}
		         value={ingredients[idx]}
		         onChange={handleIngChange}/>
	              <input
			 type="button"
			 className="delbutton"
		         name="delIng"
		         data-idx={idx}
		         id={remId}
		         onClick={handleDelete}></input>
	           </div>
	         )
	     })
           }
           <input
	      type="button"
	      className="plusbutton"
	      name="plus"
	      id="addIng"
	      onClick={handleAddIngredients}></input>
           </div>

           <label htmlFor="includecuis" id="cuislabel">Include Cuisines</label>
           <div id="includecuis">
           {
             cuisines.map((val, idx) => {

	         const cuiId = `cui-${idx}`
                 const remId = `rem-${idx}`

	         return (
                  <div className="filterinputs">
	             <input 
	                type="text"
	                name={cuiId}
	                data-idx={idx}
	                id={cuiId}
	                value={cuisines[idx]}
	                onChange={handleCuisineChange}/>
	             <input 
		        type="button"
			className="delbutton"
		        name="delCuis"
		        id={remId}
		        data-idx={idx}
		        onClick={handleDelete}/>
                  </div>
	        )
	     })
           }
           <input
	      type="button"
	      id="addCuis"
	      className="plusbutton"
	      onClick={handleAddCuisines}/>
           </div>

          <label htmlFor="includemeals" id="meallabel">Include Meals</label>
          <div id="includemeals">
          {
            mealValues.map((val, idx) => {

	        const mealId = `meal-${idx}`
                console.log(val)
	        console.log(isCheckedMeal[val])

	        return (
	          <div>
		   {/*<label htmlFor={mealId}>{val}</label>*/}
	             <input 
		        type="checkbox"
		        name={val}
		        data-idx={idx}
		        id={mealId}
		        disabled={isDisabledMeal[val]}
		        checked={isCheckedMeal[val]}
		        onChange={handleSingleCheckMeal}/>
		     <label 
			htmlFor={mealId}
			className="checkboxlabel">{val}</label>
                  </div>
	        )
	    })
          }
          </div>

          <label htmlFor="xcludeing" id="xinglabel">Exclude Ingredients</label>
          <div id="xcludeing">
          {
            xingredients.map((val, idx) => {

                 const xingId = `xingId-${idx}`
                 const remId = `rem-${idx}`

                 return (
	           <div className="filterinputs">
                      <input
                         type="text"
                         name={xingId}
                         data-idx={idx}
                         id={xingId}
                         value={xingredients[idx]}i
                         onChange={handleXingChange}/>
	              <input
		         type="button"
		         name="delXing"
		         id={remId}
		         data-idx={idx}
                         className="delbutton"
		         onClick={handleDelete}/>
	           </div>
                 )
            })
          }
          <input
	     type="button"
             id="addXing"
	     className="plusbutton"
	     onClick={handleAddXingredients}/>
          </div>

          <label htmlFor="xcludecuis" id="xcuislabel">Exclude Cuisines</label>
          <div id="xcludecuis">
          {
            xcuisines.map((val, idx) => {
	 
	        const xcuiId = `xmeal-${idx}`
                const remId = `rem-${idx}`

	        return (
	          <div className="filterinputs">
	             <input
		        type="text"
		        name={xcuiId}
		        data-idx={idx}
		        id={xcuiId}
		        value={xcuisines[idx]}
		        onChange={handleXcuisineChange}/>
		     <input
		        type="button"
		        name="delXcuis"
		        id={remId}
		        data-idx={idx}
		        className="delbutton"
		        onClick={handleDelete}/>
	          </div>
	        )
	   })
         }

         <input
	    type="button"
	    id="addXcuis"
	    className="plusbutton"
	    onClick={handleAddXcuisines}/>
       </div>

       <label htmlFor="xcludemeals" id="xmeallabel">Exclude Meals</label>
       <div id="xcludemeals">
       {
         mealValues.map((val, idx) => {

             const xmealId = `xmeal-${idx}`

             return (
	      <div>
               <input
                 type="checkbox"
                 name={val}
                 data-idx={idx}
                 id={xmealId}
		 disabled={isDisabledXmeal[val]}
                 checked={isCheckedXmeal[val]}
                 onChange={handleSingleCheckXmeal}/>
	       <label 
		  htmlFor={xmealId}
		  className="checkboxlabel">{val}</label>
	      </div>
             )
         })
       }
       </div>
       
       <div className="filterbuttons">
         <input
	   type="submit"
	   id="submitfilter"
	   value="Filter"
	   name="submit"
	   onClick={e => myForm.current.buttonId=e.target.id}/>

         <input
	   type="submit"
	   id="clearfilter"
	   value="Clear"
	   name="clear"
	   onClick={e => myForm.current.buttonId=e.target.id}/>
       </div>

      </form>
     </div>
  )
}

export default Filters
