const Complaint = require("../Models/Complaint");
const User = require("../Models/User");

module.exports.FileComplaint = async (req, res, next) => {
  try {
    const { from, to, type } = req.body;
    // console.log(req.body)
    if (!from || !to || !type) {
      return res.json({ message: "All fields are required" });
    }
    if ((await User.findById(from)) && (await User.findById(to))) {
      const complaint = await Complaint.create(
        [{ from: from, to: to, type: type }],
        { new: true }
      );
      if (!complaint) return res.json({ message: "Error creating complaint" });
      res
        .status(201)
        .json({ message: "Successfully created complaint", complaint });
    } else return res.json({ message: "One of these ids does not exist" });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.DisputeComplaint = async (req, res, next) => {
  try {
    const { id, dispute } = req.body;
    if (!id || !dispute)
      return res.status(400).json({ message: "Id and dispute string required" });
    const complaint = await Complaint.findOneAndUpdate(
      { _id: id },
      { dispute: dispute },
      { new: true }
    );
    if (!complaint) return res.json({ message: "No complaint with this id" });
    res.status(200).json({ message: "Successfully added dispute", complaint });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.CloseComplaint = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) return res.json({ message: "Id required" });
    const complaint = await Complaint.findOneAndUpdate(
      { _id: id },
      { open: false },
      { new: true }
    );
    if (!complaint) return res.json({ message: "No complaint with this id" });
    res.status(200).json({ message: "Successfully added dispute", complaint });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.GetOpenComplaints = async (req, res, next) =>{
  try{
    const complaints = await Complaint.find({open:true}).lean()
    res.status(200).json({ message: "Got all open complaints", complaints });
    next();
  }catch(e){
    return res
    .status(500)
    .json({message: e})
  }
}

module.exports.GetUndisputedComplaints = async (req,res,next) =>{
  try{
    const {id} = req.body
    const complaints = await Complaint.find({to:id, dispute:undefined}).lean()
    res.status(200).json({ message: "Got users undisputed complaints", complaints });
    next();
  }catch(e){
    return res
    .status(500)
    .json({message: e})
  }
}
