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

export default { scrollfunc, recipevalfunc, showtoast }

