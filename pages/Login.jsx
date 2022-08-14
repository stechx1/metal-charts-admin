import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import Router from "next/router";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await axios.get("api/User", {
      headers: {
        "Content-Type": "application/json",
      },
      params: { email: data.email.toLowerCase(), password: data.password },
    });
    setError("");
    console.log(result);
    if (result.status == 200) {
      Router.push("/");
      setTimeout(() => {
        Router.reload();
      }, 500);
    } else {
      return setError(result.data.message);
    }
  };

  // checking login status
  useLayoutEffect(() => {
    async function isLogedIn() {
      const { data } = await axios.get("api/User/cookie");

      if (data !== "") {
        Router.push("/");
      }
    }
    isLogedIn();
  }, []);

  return (
    <section className="min-h-screen">
      <div className="mycontainer">
        <form
          onSubmit={submitHandler}
          className={`  mt-[10%]
                        mx-auto flex w-full flex-col rounded-lg border
						${error ? "border-red-600" : "border-blue-900"}
						 px-4 py-8 shadow-xl lg:w-1/2 lg:px-8 lg:py-16`}
        >
          <h1 className="mb-4 text-center text-xl font-bold text-blue-900 lg:text-3xl">
            Admin of MetalCharts
          </h1>
          {error ? <p className="text-center text-red-600">{error}</p> : ""}

          <div className="input_group">
            <label htmlFor="email">Enter Your Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@example.com"
              required={true}
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div className="input_group">
            <label htmlFor="password">Enter Your Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              required={true}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary px-4">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
