const {FileComplaint, DisputeComplaint, CloseComplaint} = require("../Controllers/Complaint")
const router = require("express").Router();

router.post("/FileComplaint", FileComplaint);
router.post("/DisputeComplaint", DisputeComplaint)
router.post("/CloseComplaint",CloseComplaint )
module.exports = router