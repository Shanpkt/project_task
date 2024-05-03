import { useEffect, useState } from "react"
import axios from 'axios'
import   "./listView.scss"
import { useNavigate } from "react-router-dom"
const ListView=()=>{
  const [data,setData]=useState([])
  const [SearchData,setSearchData]=useState([])
  const [indextoRemove,setIndex]=useState(null)
  const nav=useNavigate()
    useEffect(()=>{
      fetchData()

    },[])

    const fetchData=async()=>{
        await axios.get('https://freetestapi.com/api/v1/countries',{timeout:2000}).then((e)=> {
            setData(e.data)
           localStorage.setItem("mydata",JSON.stringify(e.data))
             }).catch((e)=>{
                if(e.name=="AxiosError"){
                    console.log('fail')
                    const mydata=JSON.parse(localStorage.getItem('mydata'))
                    mydata==null?alert('NO DATA IN LOCALSTORAGE AND FAILED API'):setData(mydata)
             }
        })
    }

    const handel=(e)=>{
        const {value}=e.target
        if(value.length>0){
        const filterObject=data.filter(obj=>obj.name.toLowerCase().startsWith(value))
        setSearchData(filterObject)
        }else{
            setSearchData([])
        }

    }
    const sortData=()=>{
    const sortedList=[...data].sort((a,b)=>{
        const nameA=a.name.toUpperCase()
        const nameB=b.name.toUpperCase()
        if(nameA<nameB){return 1}
        if(nameA>nameB){return -1}
        return 0
    })
    console.log(sortedList)
    setData(sortedList)
    }


    const deleteHandel=(ex)=>{
       const filterList=data.filter((e)=>{return e.id!=ex})
        setIndex(ex)
        setTimeout(() => {
            setIndex(null)
            setData(filterList)
        }, 500);
      
    }

    const showDetail=(el)=>{
         localStorage.setItem('mydetails',JSON.stringify(el))
         nav('/detail')
    }
    console.log(data)
    const filterData=()=>{
        const filterList=data.filter((e)=>{return e.population<6000000})
         setData(filterList)
    }

    return(
     <div className="listBox">
        <div className="searchBox">
        <input className="searchBar" type="text" placeholder="Type Name Of Nation" onChange={handel}/>
        <div className="searchListBox">{SearchData.map((el)=>{
            return(<h6 onClick={()=>showDetail(el)} className="searchListBox__item">{el.name}</h6>)
        })}</div>
        </div>
        <button  className='optionBtn' onClick={sortData}>Sorting A-Z</button>
        <button className='optionBtn' onClick={filterData}> bellow 60 lac population </button>
        { data.map((e,index)=>{
            return(<div  className={`listElemnt ${e.id==indextoRemove?'removing':''}`}><h6 className="listElemnt__idNo">{index}</h6><h6  onClick={()=>showDetail(e)} className="listElemnt__idName">{e.name}</h6><button className="removeBtn" onClick={()=>deleteHandel(e.id)}>Remove</button></div>)
        })}
     </div>
    )
}


export default ListView