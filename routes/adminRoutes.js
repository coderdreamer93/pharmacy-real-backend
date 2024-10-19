const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarsListController,
  getHospitalListController,
  getOrganizationListController,
  deleteDonarListController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");
// Routes
const router = express.Router();

// GET DONAR LIST
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarsListController
);

// GET HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);

// GET ORGANIZATION LIST
router.get(
  "/org-list",
  authMiddleware,
  adminMiddleware,
  getOrganizationListController
);

// DELETE DONAR LIST
router.delete(
  "/delete-donar/:id",  authMiddleware,
  adminMiddleware,
  deleteDonarListController
);

// EXPORT

module.exports = router;
