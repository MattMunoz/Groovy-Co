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

      for(const complaint of data.complaints){
        const fromName = await axios.post(
          "http://localhost:4000/GetUser",
          {id: complaint.from}
        )
        complaint.fromName = fromName.data.user.username
        // console.log(complaint)
      }
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
          <b>Type:</b>
        </div>
        <div className="ingredients-item">
          <b>Dispute:</b>
        </div>
        
          
            <div className="ingredients-item"> {complaint.fromName} </div>
            <div className="ingredients-item"> {complaint.type} </div>
            <div className="ingredients-item">
            <textarea className="textBox" onChange={(e)=>setDispute(e.target.value)} />
            </div>
          
       

        <div className="ingredients-item">
        <button className="btn" onClick={()=> ignoreComplaint(complaint)} >Ignore Complaint</button>
        </div>
        <div className="ingredients-item" />

        <div className="ingredients-item">
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