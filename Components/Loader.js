import React ,{useState}from 'react'
import HashLoader from "react-spinners/HashLoader";

function Loader() {


  let [loading, setLoading] = useState(true);

  return (
    <div style={{marginTop:'150px'}}>

      
      <div className="sweet-loading justify-content-center">
     
     <HashLoader
       color='blue'
       loading={loading}
       cssOverride=''
       size={80}
       aria-label="Loading Spinner"
       data-testid="loader"
     />
   </div>

    </div>
  )
}

export default Loader
