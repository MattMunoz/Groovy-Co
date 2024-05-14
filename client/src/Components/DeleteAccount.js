import { useState } from "react";
import { useUserStore } from "../Global/userState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function DeleteAccount() {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const { clearUserStore, id } = useUserStore();
  const [cookies, removeCookie] = useCookies([]);
  console.log(id);

  function onDelete() {
    setConfirm(true);
  }

  async function ConfirmDelete(e) {
    try {
      const { data } = await axios.delete("http://localhost:4000/DeleteUser", {
        data: { id: id },
      });
      await 1000;
      console.log(data);
      removeCookie("token");
      clearUserStore();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button className="btn" onClick={onDelete}>
        Delete Account
      </button>
      {confirm && (
        <button
          className="btn"
          onClick={ConfirmDelete}
          style={{ marginLeft: "30px" }}
        >
          Confirm Delete
        </button>
      )}
    </div>
  );
}
