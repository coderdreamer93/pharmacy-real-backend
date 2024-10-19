// GET BLOOD DATA
const inventoryModal = require("../models/inventoryModal");
const mongoose = require('mongoose')

const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "B+", "B-", "A+", "A-"];
    const bloodGroupsData = [];
    const organization = new mongoose.Types.ObjectId(req.body.userId);
    // GET SINGLE BLOODGROUP
    await Promise.all(bloodGroups.map(async (bloodGroup) => {
      // count total In
      const totalIn = await inventoryModal.aggregate([
        {
          $match: {
            bloodGroup: bloodGroup,
            inventoryType: "in",
            organization,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // count total out
      const totalOut = await inventoryModal.aggregate([
        {
          $match: {
            bloodGroup: bloodGroup,
            inventoryType: "out",
            organization,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);
      //   calculate total
      const availableBlood =
        (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
      // PUSH DATA
      bloodGroupsData.push({
        bloodGroup,
    totalIn: totalIn[0]?.total || 0,
    totalOut:totalOut[0]?.total || 0,
    availableBlood
    });
    }))
    return res.status(200).send({
        success: true,
        message: 'blood data fetched successfully',
        bloodGroupsData
    })
    console.log(bloodGroupsData)
  } catch (error) {
    console.log(error);
    return res.success(500).send({
      success: false,
      message: "Error in bloodGroup data Analytics API",
      error,
    });
  }
};

module.exports = { bloodGroupDetailsController };
