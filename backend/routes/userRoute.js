const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware.js");
const { createContact } = require("../controllers/CreateContact.js");
const { registerForEvent } = require("../controllers/RegisterEvent.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/contact", createContact);
router.get("/registerforevent", registerForEvent);

module.exports = router;
