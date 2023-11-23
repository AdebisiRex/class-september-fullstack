import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, {useState} from 'react'

const login = () => {
    const router = useRouter()
    const [value, setValues] = useState({
      email: "",
      password: "",

    });

    const loginUser=async(e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post("http://localhost:8050/users/login", value)
            if(data.status){
                router.push("/fund-account")
                localStorage.token = data.token
            }
        }catch(err){
            console.log("there was an error")
        }
    }
  return (
    <div>
        <Navbar/>
      <form
        onSubmit={(e) => loginUser(e)}
        className="col-7 mx-auto border rounded-3 p-3"
      >
        <h1>Login User </h1>
        <input
          type="text"
          placeholder="Email"
          className="mb-3 form-control"
          value={value.email}
          onChange={(e) => setValues({ ...value, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Password"
          className="mb-3 form-control"
          value={value.password}
          onChange={(e) => setValues({ ...value, password: e.target.value })}
        />

        <button className="btn btn-dark ">Login User </button>
      </form>
    </div>
  );
}

export default login