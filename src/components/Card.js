import React from 'react'
import '../styles/Card.css';

const Card = ({dashBoardData,children}) => {
  const {title,value} = dashBoardData;
  return (
    <div className='card-container'>
      <div className='mt-20'>
        {children}
      </div>
       <div className='card-value'>
       <h5>{title}</h5>
       <h1>{value()}</h1>
       </div>
    </div>
  )
}

export default Card