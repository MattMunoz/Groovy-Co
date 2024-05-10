import { Header } from "../Components/Header";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
// import { useUserStore } from "../Global/userState";
import { Payment } from "../Components/Payment";

export default function Checkout() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  // const { updateUsername, updateRole } = useUserStore();
  // const [type, setType] = useState("Delivery");
  const orderNo = Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000/checkout",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      return status
        ? toast(`Hello ${user.role} ${user.username}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <div>
      <Header />
      <Payment orderNo={orderNo}/>
      <div className="bar">
        <strong>Groovy Co.</strong>
      </div>
    </div>
  );
}
