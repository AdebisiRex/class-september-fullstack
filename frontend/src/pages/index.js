import Head from "next/head";
import Image from "next/image";
import { Inter, Metrophobic } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import { headers } from "../../next.config";
import { queryToJSON } from "../../helper";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const submitForm = async (values) => {
    values.preventDefault();
    try {

      let data = values.target.action.split("?")[1];
  
      const userObject = queryToJSON(data);
      console.log(userObject);
      const response = await axios.post(
        "http://localhost:8050/users/register",
        userObject
      );
      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <form
          onSubmit={(e) => submitForm(e)}
          className="col-7 mx-auto p-3 border rounded-3"
        >
          <h1 className="text-warning">
            Register ||<span className="fw-bold text-danger"> ATM APP</span>
          </h1>
          <hr />
          <div className="mb-3">
            <label htmlFor="">First Name</label>
            <input
              name="firstname"
              type="text"
              placeholder="First Name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Last Name</label>
            <input
              name="lastname"
              type="text"
              placeholder="Last Name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
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