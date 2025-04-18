import {useState,useEffect,useContext} from 'react'
import './LoginPopUp.css'
import {StoreContext} from '../../context/StoreContext'
import {assets} from '../../assets/assets'
import {toast} from 'react-toastify'
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {
    
    const [curState,setCurState] = useState("Sign Up")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler =(e)=>{
        const {name,value} = e.target
        setData({...data,[name]:value})
    }
    
    const {url,token,setToken} = useContext(StoreContext) 

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        let newUrl = url
        if(curState==="Sign Up"){
            newUrl = `${url}/api/user/register`
        }else{
            newUrl = `${url}/api/user/login`
        }
        try{
            const response = await axios.post(newUrl,data)
            if(curState==="Sign Up"){
                toast.success("Account created successfully! Please log in to continue.")
                setCurState("Log In")
            }
            else{
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)   
                setShowLogin(false)
            }
        }catch(error){
            toast.error(error.response?.data?.message || "An error occurred")
        }
    }



  return (
    <div className='login-popup'>
        <form onSubmit={onSubmitHandler} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{curState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {curState!=="Log In" && <input onChange={onChangeHandler} name='name' value={data.name} type="text" placeholder='Your Name' required/>}
                <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Your Email' required/>
                <input onChange={onChangeHandler} name='password' value={data.password} type="password" placeholder='Password' required/>
                <button type='submit' className='btn'>{curState==="Sign Up"?"Create Account":"Log In"}</button>
            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>
                    By continuing, I agree to the terms & privacy policy
                </p>
            </div>
            {
                curState==="Log In" 
                ? <p>Create a new account? <span onClick={()=>setCurState("Sign Up")}>Click here</span></p>
                : <p>Already have an account? <span onClick={()=>setCurState("Log In")}>Log In</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopUp