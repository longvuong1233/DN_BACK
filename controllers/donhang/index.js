const mysql = require("../../database/index")

const getDonHang = (req, res, next) => {
    console.log("sds")
    let sql = "select * from item"
    mysql.query(sql, (err, result, fields) => {
        if (err) next(err)
        res.status(200).json(result)
    })
}

module.exports = {
    getDonHang
}