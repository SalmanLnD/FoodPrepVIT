import { useState,useEffect } from 'react'
import './List.css'
import { toast } from'react-toastify'
import axios from 'axios'
const List = ({url}) => {
  const [list,setList] = useState([])

  const fetchList = async()=>{
    try {
      const response = await axios.get(`${url}/api/food/list`)
      setList(response.data.data)
      console.log(response.data.data) 
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  useEffect(()=>{
    fetchList()
  },[])
  const removeFood = async(id)=>{
    try {
      const response = await axios.delete(`${url}/api/food/remove?id=${id}`)
      fetchList()
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='list screen flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p><b>Image</b></p>
          <p><b>Name</b></p>
          <p><b>Category</b></p>
          <p><b>Price</b></p>
          <p><b>Action</b></p>
        </div>
        {
          list.map((item,index)=>{
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/image/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List