import { useUserStore } from "../Global/userState";
import axios from "axios";
import { useEffect, useState,Fragment } from "react";

export default function DisputeComplaint(){
  const {id} = useUserStore()
  const [undisputedComplaints, setUndisputedComplaints] = useState([]) 
  const [dispute, setDispute] = useState("")

  async function getUndisputedComplaints() {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/GetUndisputedComplaints",
        {id}
      );
      console.log(data)
      setUndisputedComplaints(data.complaints);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUndisputedComplaints();
  }, []);

  async function ignoreComplaint(complaint){
    try{
      const update = await axios.post(
        "http://localhost:4000/disputeComplaint",
        {id:complaint._id, dispute:" "}
      )
      
      console.log(update)
      if(update) getUndisputedComplaints()

    } catch(e){
      console.log(e)
    }
  }

  async function submitDispute(complaint){
    try{
      const update = await axios.post(
        "http://localhost:4000/disputeComplaint",
        {id:complaint._id, dispute}
      )
      
      console.log(update)
      if(update) getUndisputedComplaints()

    } catch(e){
      console.log(e)
    }
  }

  return(
    
   undisputedComplaints?.map((complaint) => {
    return(
    <Fragment key={complaint._id}> 
    
      <div>Complaints aganist you</div>
      <div className="order-container">
      {/* <div className="order-item">
          <b>{()=> getChefName(order.orderer)}</b>
        </div>
        <div className="order-item">
          <b>Quantity:</b>
        </div> */}
        <div className="order-item">
          <b>From:</b>
        </div>
        <div className="order-item">
          <b>Dispute:</b>
        </div>
        
          
            <div className="order-item"> {complaint.from} </div>
            <div className="order-item">
            <textarea className="textBox" onChange={(e)=>setDispute(e.target.value)} />
            </div>
          
       

        <div className="order-item">
        <button className="btn" onClick={()=> ignoreComplaint(complaint)} >Ignore Complaint</button>
        </div>

        <div className="order-item">
          <button className="btn" onClick={()=> submitDispute(complaint)} >Submit Dispute</button>
        </div>
      </div>
      <br />
      <br />
      <hr />
      <br />
    </Fragment>
    )
  })
    
  )
}