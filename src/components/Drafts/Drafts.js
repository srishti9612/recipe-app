import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './../Common.css'
import './Draft.css'
import { ReactComponent as FoodLogo } from './../assets/food.svg'
import { ReactComponent as BackLogo } from './../assets/back.svg'
import retrieveService from '../../services/retrieve.js'
import helper from './../utils/helper.js'
import Loader from 'react-loader-spinner'

const Drafts = () => {

  const [ draftsAll, setDraftsAll ] = useState([])

  const history = useHistory()

  const handleBack = () => {
    history.push('/home')
  }

  useEffect(() => {
     let draftArray
     retrieveService
        .getAllDrafts()
        .then(returnedObject => {
	          console.log(returnedObject)
            draftArray = [...returnedObject]
	          console.log(draftArray)
            setDraftsAll(draftArray)
            console.log(draftsAll)
	          let deleId = window.localStorage.getItem('deleId')
	          let contId = 'dsection2'
	          helper.scrollfunc(deleId, contId)
	          window.localStorage.setItem('deleId', 'dId-0')
        })

  }, [])

  return (
    <div className="flex-container">
      <div className="Side">
	 <BackLogo className="backlogo" onClick={handleBack}/>
	 <div className="middle"></div>
	 <FoodLogo className="foodlogo"/>
      </div>
      <div className="content">
	 <div className="dsection1">
	   <div id="alldrafts">Drafts</div>
	 </div>
	 <div className="dsection2" id="dsection2">
        { (draftsAll.length > 0) ?
          draftsAll.map((draft, i) =>
	        <div id={"dId-" + i}
		         className="listitem"
		         onClick={()=>{
		             console.log(i)
		             console.log(draft.date)
		             window.localStorage.setItem('deleId', 'dId-' + i)
		             console.log(draft)
		             history.push('/publishdraft', { draft: draft })
		          }}>
              <p id="drafttext">{draft.title}</p>
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

export default Drafts
