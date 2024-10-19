const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
// const { loginController } = require("../controllers/loginController");

const router = express.Router();

// router
// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// current user
router.get('/current-user', authMiddleware, currentUserController);

module.exports = router;
