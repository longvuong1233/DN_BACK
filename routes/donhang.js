const express = require("express")
const controller = require("../controllers/donhang/index")

const router = express.Router();

router.get("/getall", controller.getDonHang)


module.exports = router