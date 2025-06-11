import React from 'react'

const Mark = ({strokeColor ='white', size = '20'}) => {
  return (
    <div>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.95801 14.9993L3.20801 10.2493L4.39551 9.06185L7.95801 12.6243L15.6038 4.97852L16.7913 6.16602L7.95801 14.9993Z" fill={strokeColor}/>
</svg>
    </div>
  )
}

export default Mark
