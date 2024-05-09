const {FileComplaint, DisputeComplaint, CloseComplaint, GetOpenComplaints} = require("../Controllers/Complaint")
const router = require("express").Router();

router.post("/FileComplaint", FileComplaint);
router.post("/DisputeComplaint", DisputeComplaint)
router.post("/CloseComplaint",CloseComplaint )
router.get("/GetOpenComplaints", GetOpenComplaints)
module.exports = router