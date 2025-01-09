const express = require("express");
const { getUsersForSidebar } = require("../controllers/userController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.get("/", protect, getUsersForSidebar);

module.exports = router;
