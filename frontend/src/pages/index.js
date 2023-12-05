import Head from "next/head";
import Image from "next/image";
import { Inter, Metrophobic } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import { headers } from "../../next.config";
import { queryToJSON } from "../../helper";
import axios from "axios";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState({});
  const submitForm = async (values) => {
    values.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8050/users/register",
        user
      );
      setDisplay(true);
      setData(response.data.user);
      alert(`Your user id is ${response.data.user.userId}, please keep safely`);
      // console.log(response.data.user)
    } catch (err) {
      console.log(err);
    }
  };

  const processImage =(e)=>{
    const img = e.target.files[0]
    console.log(img)
    // return 
    const file = new FileReader(); 
    file.readAsDataURL(img)
    file.onload =async()=>{
      console.log ("Hello we have been completed ")
      console.log({img, file})
      console.log(file.result)
      // return
     let data = await axios.post("http://localhost:8050/users/upload-image",{image: file.result, name: "adebisi"})

     console.log(data)
    }
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-5 mx-auto col-9 p-4 bg-success bg-opacity-25">
        <input onChange={(e)=>processImage(e)} className="form-control mb-3" type="file"  name="" id="" />
        <input type="text" className="form-control mb-3" placeholder="File name" name="" id="" />
        <button className="form-control btn btn-danger"> Upload File</button>
      </div>


      <main>
        <Navbar />
        <form
          onSubmit={(e) => submitForm(e)}
          className="col-7 mx-auto p-3 border rounded-3"
        >
          {display === true ? (
            <>
              <table className="table table-bordered">
                <caption className="text-danger">
                  Please Keep Your user ID safely
                </caption>
                <tr>
                  <td>UserId</td>
                  <td>{data.userId}</td>
                </tr>
              </table>
            </>
          ) : (
            ""
          )}
          <h1 className="text-warning">
            Register ||<span className="fw-bold text-danger"> ATM APP</span>
          </h1>
          <hr />
          <div className="mb-3">
            <label htmlFor="">First Name</label>
            <input
              name="firstname"
              type="text"
              value={user.firstname}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              placeholder="First Name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Last Name</label>
            <input
              name="lastname"
              type="text"
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              placeholder="Last Name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              className="form-control"
            />
          </div>
          <button className="form-control btn btn-danger">Register</button>
        </form>
      </main>

      
    </>
  );
}
