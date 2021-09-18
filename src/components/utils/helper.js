import * as Scroll from 'react-scroll'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

let scroller = Scroll.scroller

const scrollfunc = (eleId, contId) => {
     console.log("inside scrollfunc")
     console.log(eleId)
     console.log(contId)
     scroller.scrollTo(eleId, {
        /*duration: 1500,
        smooth: true,*/
        containerId: contId
     })
}

const recipevalfunc = (newRecipe) => {
    let valObj = {
       title: false,
       cuisine: false,
       meal: false,
       course: false,
       ingredients: false,
       method: false
    }

    let valSuccess = true

    if (newRecipe.title === '') {
       valObj['title'] = true
       valSuccess = false
    }

    if (newRecipe.cuisine === '') {
       valObj['cuisine'] = true
       valSuccess = false
    }

    if (newRecipe.meal === '' || newRecipe.meal === 'Select') {
       valObj['meal'] = true
       valSuccess = false
    }

    if (newRecipe.course === '' || newRecipe.course === 'Select') {
       valObj['course'] = true
       valSuccess = false
    }

    let ingredientArray = newRecipe.ingredients

    for (let i=0; i<ingredientArray.length; i++) {
       if (ingredientArray[i].name === '' || ingredientArray[i].quantity === '') {
         valObj['ingredients'] = true
	 valSuccess = false
	 break
       }
    }

    if (newRecipe.method === '') {
       valObj['method'] = true
       valSuccess = false
    }

    let resultObject = {
       valObj: valObj,
       result: valSuccess
    }

    return resultObject
}

const showtoast = (message) => {
  toast(message, { position: toast.POSITION.TOP_CENTER, autoClose: false })
}

const capitalizeFirst = (string) => {
   
   let separatedString = string.toLowerCase().split(' ')
	   console.log(separatedString)

   for(let i=0; i<separatedString.length; i++){
      separatedString[i] = separatedString[i].charAt(0).toUpperCase() + separatedString[i].substring(1)
   }

   let formatedString = separatedString.join(' ')

   return formatedString
}

const formatIngredientLower = (ingredient) => {

   let formatedIngredient = [...ingredient]

   for(let i=0; i<formatedIngredient.length; i++){
      formatedIngredient[i].name = formatedIngredient[i].name.toLowerCase().trim()
   }

   return formatedIngredient
}

const formatIngredientUpper = (ingredient) => {

   let formatedIngredient = [...ingredient]

   for(let i=0; i<formatedIngredient.length; i++){
      formatedIngredient[i].name = (formatedIngredient[i].name.charAt(0).toUpperCase() + formatedIngredient[i].name.substring(1)).trim() 
   }

   return formatedIngredient
}

const formatFilterObj = (filterObj) => {
     let formatedObj = {}
     
     if(filterObj !== null){
     //ingredients
       if(filterObj.ingredients){
          let ingredients = filterObj.ingredients
          for(let i=0; i<ingredients.length; i++){
             ingredients[i] = ingredients[i].toLowerCase().trim()
          }
          formatedObj.ingredients = ingredients
       }

       if(filterObj.xingredients){
          let xingredients = filterObj.xingredients
          for(let i=0; i<xingredients.length; i++){
             xingredients[i] = xingredients[i].toLowerCase().trim()
          }
          formatedObj.xingredients = xingredients
       }

       if(filterObj.cuisines){
          let cuisines = filterObj.cuisines
          for(let i=0; i<cuisines.length; i++){
            cuisines[i] = cuisines[i].toLowerCase().trim()
          }
          formatedObj.cuisines = cuisines
       }
     
       if(filterObj.xcuisines){
          let xcuisines = filterObj.xcuisines
          for(let i=0; i<xcuisines.length; i++){
            xcuisines[i] = xcuisines[i].toLowerCase().trim()
          }
         formatedObj.xcuisines = xcuisines
       }

     
       if(filterObj.meals){
         formatedObj.meals = filterObj.meals
       }
    
       if(filterObj.xmeals){
         formatedObj.xmeals = filterObj.xmeals
       }

   }
   
   return formatedObj

}

export default { scrollfunc, recipevalfunc, showtoast, capitalizeFirst, formatIngredientLower, formatIngredientUpper, formatFilterObj }

