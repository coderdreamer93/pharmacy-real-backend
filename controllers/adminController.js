const userModal = require("../models/userModal");

// GET DONAR LIST
const getDonarsListController = async (req, res) => {
  try {
    const donarData = await userModal
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: donarData.length,
      message: "Donar list fetch successfully",
      donarData,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Donar API",
      error,
    });
  }
};

// GET HOSPITAL LIST
const getHospitalListController = async (req, res, next) => {
  try {
    const hospitalData = await userModal
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: hospitalData.length,
      message: "Hospital list fetch successfully",
      hospitalData,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Hospital API",
      error,
    });
  }
};

// GET ORGANIZATION LIST
const getOrganizationListController = async (req, res, next) => {
  try {
    const OrgData = await userModal
      .find({ role: "organization" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: OrgData.length,
      message: "Organization list fetch successfully",
      OrgData,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Organization API",
      error,
    });
  }
};

// DELETE DONAR LIST
const deleteDonarListController = async (req, res) => {
  try {
    await userModal.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Record deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting",
      error,
    });
  }
};

module.exports = {
  getDonarsListController,
  getOrganizationListController,
  getHospitalListController,
  deleteDonarListController,
};
