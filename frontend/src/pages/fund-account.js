import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useState } from "react";
import { headers } from "../../next.config";

const FundAccount = () => {
  const [value, setValues] = useState({
    amount: "",
  });
  const addMoneyToAccount = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      "http://localhost:8050/account/fund-account",
      value,
      { headers: { Authorization: localStorage.token  } }
    );
    console.log(data);
  };
  return (
    <div>
      <Navbar />
      <form
        onSubmit={(e) => addMoneyToAccount(e)}
        className="col-7 mx-auto border rounded-3 p-3"
      >
        {/* <h1>Fund Account</h1>
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
        <hr /> */}
        <input
          type="number"
          min={"0"}
          max="100000"
          placeholder="Amount to Fund"
          className="mb-3 form-control"
          value={value.amount}
          onChange={(e) => setValues({ ...value, amount: e.target.value })}
        />

        <button className="btn btn-warning ">Fund Account</button>
      </form>
    </div>
  );
};

export default FundAccount;
