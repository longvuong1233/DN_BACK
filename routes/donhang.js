const express = require("express")
const controller = require("../controllers/donhang/index")

const router = express.Router();

router.get("/getall", controller.getDonHang)
router.post('/mardeliveringorders', controller.markDeliveringOrder)
router.post("/markdeliveriedorder", controller.markDeliveriedOrder)


module.exports = router