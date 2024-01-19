const express = require("express");
const router = express.Router();
const{getAlerts,createAlerts}=require("../controllers/alertController");


// get alerts
router.get("/", getAlerts);

// create alerts
router.post("/", createAlerts);

module.exports = router;