import React from 'react'

const Home = ({ strokeColor = "black" }) => {
  return (
    <div>
      <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.9349 8.49967V5.83301H27.2682V8.49967H5.9349ZM5.9349 27.1663V19.1663H4.60156V16.4997L5.9349 9.83301H27.2682L28.6016 16.4997V19.1663H27.2682V27.1663H24.6016V19.1663H19.2682V27.1663H5.9349ZM8.60156 24.4997H16.6016V19.1663H8.60156V24.4997ZM7.3349 16.4997H25.8682L25.0682 12.4997H8.1349L7.3349 16.4997Z"
 fill={ strokeColor }/>
</svg>

    </div>
  )
}

export default Home
