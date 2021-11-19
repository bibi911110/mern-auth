import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login first");
      }
    };
    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span className='error-message'>{error}</span>
  ) : (
    <div className='private-screen'>
      <div className='private-screen__presentation'>
        <div className='private-screen__data'>{privateData}</div>
        <button className='btn' onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default PrivateScreen;
