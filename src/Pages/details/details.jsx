import { useEffect, useState } from "react"
import  "./details.scss"
const DetailPage=()=>{
    const [data,setData]=useState({})
    useEffect(()=>{
    const mydetails=JSON.parse(localStorage.getItem('mydetails'))
        setData(mydetails)
    },[])
    return(
        
        
       <div className="detailsBox">
          <div className="detailsBox__imgBox"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzq3d0UdavYlwwUJ2dfI5lamnpOGAiwuM20ibAKF6kRg&s'/></div>
          <div className="infobox">
            <h3 className="heading">Country Info</h3>
            <h4 className="info"><span>Name</span>:-{data.name}</h4>
            <h4 className="info"><span>Capital</span>:-{data. capital}</h4>
            <h4 className="info"><span>Currency</span>:-{data.currency}</h4>
          </div>
       </div>
        
        
        )
}

export default DetailPage