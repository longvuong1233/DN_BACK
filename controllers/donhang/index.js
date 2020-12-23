const mysql = require("../../database/index")

const getDonHang = (req, res, next) => {

    let sql = "select * from item"
    mysql.query(sql, (err, result, fields) => {
        if (err) next(err)
        res.status(200).json(result)
    })
}

const markDeliveringOrder = (req, res, next) => {
    const { orders } = req.body

    orders.forEach(element => {
        let sql = `update  item set trangthai = 1 where id=${element.id}`
        mysql.query(sql, (err) => {
            if (err) {
                console.log(err)
            }
        })
    });
    res.status(200).json({
        result: true
    })
}

const markDeliveriedOrder = (req, res, next) => {
    const { order } = req.body

    let sql = `update  item set trangthai = 2 where id=${order.id}`
    mysql.query(sql, (err) => {
        if (err) {
            console.log(err)
        }
    })

    res.status(200).json({
        result: true
    })
}

module.exports = {
    getDonHang,
    markDeliveringOrder,
    markDeliveriedOrder
}