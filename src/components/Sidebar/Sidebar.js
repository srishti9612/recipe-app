import React, { useState } from 'react'
import './Sidebar.css'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import SlidingPane from 'react-sliding-pane'
import { ReactComponent as FoodLogo } from './food.svg'
import { ReactComponent as FilterLogo } from './filter.svg'
import Filters from '../Filters/Filters'


const Sidebar = () => {
  
  const [ state, setState ] = useState({
    isPaneOpenLeft: false,	  
  })

  return (
    <div className="sidebar">
      <div className="filterlogodiv">
      <FilterLogo className="filterlogo" onClick={() => setState({ isPaneOpenLeft: true})}/>
      <div className="filtertext">Filter</div>
      </div>
      <SlidingPane
	       isOpen={state.isPaneOpenLeft}
	       from="left"
	       width="500px"
	       onRequestClose={() => {
	          setState({ isPaneOpenLeft: false})
	    }}>
	   <Filters />
     </SlidingPane>
      <div className="middle"></div>
      <FoodLogo className="foodlogo" />
    </div>
  )
}

export default Sidebar
