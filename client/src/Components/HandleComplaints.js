import { useUserStore } from "../Global/userState";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";

export default function HandleComplaints() {
  const [openComplaints, setOpenComplaints] = useState([]);

  async function getOpenComplaints() {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/GetOpenComplaints"
      );
      // console.log(data);
      for(const complaint of data.complaints){
        const toName = await axios.post(
          "http://localhost:4000/GetUser",
          {id: complaint.to}
        )
        // console.log(toName)
        complaint.toName = toName.data.user.username
        const fromName = await axios.post(
          "http://localhost:4000/GetUser",
          {id: complaint.from}
        )
        complaint.fromName = fromName.data.user.username
        // console.log(complaint)
      }
      setOpenComplaints(data.complaints);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getOpenComplaints();
  }, []);

  async function submitValidComplaint(complaint) {
    try {
      const result = await axios.post("http://localhost:4000/CloseComplaint", {
        id: complaint._id,
      });
      // console.log(result);
      if (result) {
        if (complaint.type.toLowerCase().trim() === "fraud") {
          const loser = await axios.post(
            "http://localhost:4000/DeleteUser",
            {
              id: complaint.to
            }
          );
        } else {
          const loser = await axios.post(
            "http://localhost:4000/DecreaseStanding",
            {
              id: complaint.to,
              amount: 1,
            }
          );
        }
        getOpenComplaints()
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function submitInvalidComplaint(complaint) {
    try {
      const result = await axios.post("http://localhost:4000/CloseComplaint", {
        id: complaint._id,
      });
      // console.log(result);
      if (result) {
        const loser = await axios.post(
          "http://localhost:4000/DecreaseStanding",
          {
            id: complaint.from,
            amount: 1,
          }
        );
        getOpenComplaints()
      }
    } catch (e) {
      console.log(e);
    }
  }
  // async function GetUserName(id){
  //   if(id){
  //     // console.log(id)
  //     const {user} = await axios.post(
  //       "http://localhost:4000/GetUser",
  //       {id}
  //     );
  //     // console.log(user)

  //     if(user){
  //       return user.username
  //     }
  //   }
  // }

  // async function Name(id){
  //   const name = await getUserName(id)
  //   console.log(name)
  //   // if(name){
  //   //   return <div className="ingredients-item"> {name} </div>
  //   // }
  // }

  return openComplaints?.map((complaint) => {
    return (
      <Fragment key={complaint._id}>
        <div style={{ fontSize: "medium" }}>Open Complaints</div>
        <div className="ingredients-container">
          {/* <div className="ingredients-item">
          <b>{()=> getChefName(ingredients.ingredientser)}</b>
        </div>
        <div className="ingredients-item">
          <b>Quantity:</b>
        </div> */}
          <div className="ingredients-item">
            <b>From:</b>
          </div>
          <div className="ingredients-item">
            <b>To:</b>
          </div>
          <div className="ingredients-item">
            <b>Dispute:</b>
          </div>

          <div className="ingredients-item"> {complaint.fromName} </div>
          <div className="ingredients-item"> {complaint.toName} </div>
          <div className="ingredients-item">{complaint.dispute}</div>

          <div className="ingredients-item">
            <button className="btn" onClick={()=>submitValidComplaint(complaint)}>Valid Complaint</button>
          </div>

          <div className="ingredients-item" />

          <div className="ingredients-item">
            <button className="btn" onClick={()=>submitInvalidComplaint(complaint)}>Invalid Complaint</button>
          </div>
        </div>
        <br />
        <br />
        <hr />
        <br />
      </Fragment>
    );
  });
}
