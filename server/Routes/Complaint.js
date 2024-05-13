const {FileComplaint, DisputeComplaint, CloseComplaint, GetOpenComplaints, GetUndisputedComplaints} = require("../Controllers/Complaint")
const router = require("express").Router();

router.post("/FileComplaint", FileComplaint);
router.post("/DisputeComplaint", DisputeComplaint)
router.post("/CloseComplaint",CloseComplaint )
router.get("/GetOpenComplaints", GetOpenComplaints)
router.post("/GetUndisputedComplaints", GetUndisputedComplaints)
module.exports = router