var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var parse = require('co-body');
var dbConfig = require('../db/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
// 添加json解析


router.get('/register', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        var number = param.unumber;
        var buyer_name = param.buyer_name;
        var pwd = param.upwd;
        var getpwd = "SELECT upwd FROM User WHERE unumber='" + number + "'";
        var insert = "INSERT INTO User(unumber,upwd,buyer_name) VALUES(?,?,?)";
        connection.query(getpwd, function (err, result) {
            //用数据库的连接执行一条sql语句
            if (result.length != 0) {
                result = {
                    code: 101,
                };
                responseJSON(res, result);
            } else {
                connection.query(insert, [number, pwd, buyer_name], function (err, result) {
                    result = {
                        code: 100,
                    };
                    responseJSON(res, result);
                })
            }
        });
        connection.end();
    });
})

router.get('/login', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        var number = param.unumber;
        var pwd = param.upwd;
        var buyer_name = "SELECT buyer_name FROM User WHERE unumber='" + number + "' AND upwd='" + pwd + "'";
        console.log(number);
        console.log(pwd);
        connection.query(buyer_name, [number, pwd], function (err, result) {
            if (result.length != 0) {
                result2 = {
                    code: 100,
                    username: result[0].buyer_name
                };
                console.log(result2);
                responseJSON(res, result2);
            } else {
                result2 = {
                    code: 101,
                };
                responseJSON(res, result2);
            }
        });
        connection.end();
    });
})


//前端页面用到的，添加一个新的商品的接口
router.get('/add_cloth_list', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        var number = param.number;
        var type = param.type;
        var items = param.items;
        var price = param.price;
        var describe = param.describe;
        var picture = param.picture;
        var add = "INSERT INTO cloth_list(number,type,items,price,picture,cloth_list.describe) VALUES(?,?,?,?,?,?)";
        connection.query(add, [number, type, items, price, picture,describe], function (err, result) {
            if (err) {
                console.log(err);
                console.log("添加失败");
            } else {
                responseJSON(res, result);
                console.log("添加成功");
            }
        });
        connection.end();
    });
})


//下单的接口，安卓端用
router.post('/add_order_list', function (req, res) {
    pool.getConnection(function (err, connection) {
        console.log(req.body);
        var data = req.body;//获取安卓端回传的数据
        for (var i = 0; i < data.length; i++) {
            var user_id = data[i].user_id;
            var user_name = data[i].user_name;
            var user_phone = data[i].user_phone;
            var user_address = data[i].user_address;
            var product_id = data[i].product_id;
            var product_name = data[i].product_name;
            var product_price = data[i].product_price;
            var product_count = data[i].product_count;
            var product_img = data[i].product_img.split("3000/")[1];
            var product_type = data[i].product_type;

            console.log(product_type);

            var date_o = new Date();
            var order_date = date_o.toLocaleString();
            var add = "INSERT INTO order_list(unumber,number,items,address,phone,price,count,buyer,order_date,product_img,product_type) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
            var add_data = [user_id, product_id, product_name, user_address, user_phone, product_price, product_count, user_name, order_date, product_img, product_type];
            connection.query(add, add_data, function (err, result) {
                if (err) {
                    console.log(err);
                    console.log("添加失败");
                } else {

                    console.log("添加成功");
                }
            });

        }
        connection.end();
        responseJSON(res, "100");

    });

});

//更新商品，在web端使用
router.get('/update_cloth_list', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        var number = param.number;
        var type = param.type;
        var items = param.items;
        var price = param.price;
        var describe = param.describe;
        var picture = param.picture;
        var down_number = param.down_number;
        if (number) {
            var update_cloth_list = "UPDATE cloth_list SET type = '" + type + "',items = '" + items + "',price = '" + price + "',cloth_list.describe = '" + describe + "',picture = '" + picture + "' WHERE number = '" + number + "'";
            connection.query(update_cloth_list, function (err, result) {
                if (err) {
                    console.log(err);
                    console.log("更新失败");
                } else {
                    console.log("更新成功");
                }
            });
        }
        if (down_number) {
            var delete_cloth = "DELETE FROM cloth_list WHERE number = '" + down_number + "'";
            connection.query(delete_cloth, function (err, result) {
                if (err) {
                    console.log(err);
                    console.log("删除失败");
                } else {
                    responseJSON(res, result);
                    console.log("删除成功");
                }
            });
        }
        connection.end();

    });
})

//获取所有订单，web用
router.get('/order_list', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        var order_list = "SELECT * FROM order_list";
        connection.query(order_list, function (err, result) {
            if (err) {
                console.log(err);
                console.log("添加失败");
            } else {
                responseJSON(res, result);
                // console.log(result);
                console.log("添加成功");
            }
        });
        connection.end();
    });
})

//衣服的列表
router.get('/cloth_list', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        var order_list = "SELECT * FROM cloth_list";
        connection.query(order_list, function (err, result) {
            if (err) {
                console.log(err);
                console.log("添加失败");
            } else {
                responseJSON(res, result);
                // console.log(result);
                console.log("添加成功");
            }
        });
        connection.end();
    });
})

//查询，需要带一个参数，例如：上衣
router.get('/search', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        var key = param.key;
        var search_cloth_list = "SELECT * FROM cloth_list WHERE items LIKE '%" + key + "%'";
        connection.query(search_cloth_list, function (err, result) {
            if (err) {
                console.log(err);
                console.log("查询失败");
            } else {
                responseJSON(res, result);
                console.log(result);
                console.log("查询成功");
            }
        });
        connection.end();
    });
})


router.get('/get_cloth_list', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        var type = param.type;
        var selet_cloth_list = "SELECT * FROM cloth_list  WHERE type='" + type + "'";
        connection.query(selet_cloth_list, function (err, result) {
            if (err) {
                console.log(err);
                console.log("查询失败");
            } else {
                responseJSON(res, result);
                console.log("查询成功");
            }
        });
        connection.end();
    });
})


//获取自己的订单，需要传一个
router.get('/get_order_list', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        var unumber = param.unumber;
        var selet_cloth_list = "SELECT * FROM order_list  WHERE unumber='" + unumber + "'";
        connection.query(selet_cloth_list, function (err, result) {
            if (err) {
                console.log(err);
                console.log("查询失败");
            } else {
                responseJSON(res, result);
                console.log("查询成功");
            }
        });
        connection.end();
    });
})

router.get('/callback', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        var user_phone = param.user_phone;
        var user_name = param.user_name;
        var text = param.text;

        var date = new Date();
        var _date = date.toLocaleString();

        var userAddSql = 'INSERT INTO call_back(user_phone, user_name, text, date) VALUES(?,?,?,?)';
        var userAddSql_Params = [user_phone, user_name, text, _date];
        connection.query(userAddSql, userAddSql_Params, function (err, result) {
            if (err) {

            } else {
                responseJSON(res, result);
            }
        });


        connection.end();
    });
})


router.get('/shoucang', function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        var user_phone = param.user_phone;
        var product_id = param.product_id;
        var shoucang = param.shoucang;

        console.log(user_phone);

        if (shoucang == "1") {

            var search_cloth_list = "SELECT shoucang FROM cloth_list WHERE id='" + product_id + "'";
            connection.query(search_cloth_list, function (err, result) {
                if (err) {
                    console.log(err);
                    console.log("查询失败");
                } else {
                    var _shoucang = result[0].shoucang;

                    if (_shoucang != null) {
                        if (_shoucang.indexOf(user_phone) != -1) {
                            responseJSON(res, "100");
                        } else {
                            _shoucang = _shoucang + user_phone + ";";
                            var sql = 'UPDATE cloth_list SET shoucang = ? WHERE id = ?';
                            var data = [_shoucang, product_id];
                            connection.query(sql, data, function (err, result) {
                                if (err) {
                                    console.log(err)
                                    return;
                                }
                                console.log("成功");
                                responseJSON(res, "100");

                            });

                        }
                    } else {
                        _shoucang = "";
                        _shoucang = _shoucang + user_phone + ";";
                        var sql = 'UPDATE cloth_list SET shoucang = ? WHERE id = ?';
                        var data = [_shoucang, product_id];
                        connection.query(sql, data, function (err, result) {
                            if (err) {
                                console.log(err)
                                return;
                            }
                            console.log("成功");
                            responseJSON(res, "100");

                        });
                    }


                }
            });


        } else {

            var search_cloth_list = "SELECT shoucang FROM cloth_list WHERE id='" + product_id + "'";
            connection.query(search_cloth_list, function (err, result) {

                if (err) {
                    console.log(err)
                } else {
                    var _shoucang = result[0].shoucang;

                    if (_shoucang == null) {
                        responseJSON(res, "100");
                        return;
                    }

                    if (_shoucang.indexOf(user_phone) != -1) {
                        _shoucang = _shoucang.replace(user_phone + ";", "");
                        var sql = 'UPDATE cloth_list SET shoucang = ? WHERE id = ?';
                        var data = [_shoucang, product_id];
                        connection.query(sql, data, function (err, result) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log("成功");
                            responseJSON(res, "100");

                        });

                    }

                }


            });


        }


        connection.end();
    });
})


router.get("/about_our.html", function (req, res, next) {
    res.render("about_our");
})

router.get("/load.html", function (req, res, next) {
    res.render("load");
})

router.get("/add_cloth.html", function (req, res, next) {
    res.render("add_cloth");
})

router.get("/home_page.html", function (req, res, next) {
    res.render("home_page");
})

router.get("/order_list.html", function (req, res, next) {
    res.render("order_list");
})

router.get("/cloth_list.html", function (req, res, next) {
    res.render("cloth_list");
})

router.get("/update_cloth_list.html", function (req, res, next) {
    res.render("update_cloth_list");
})

module.exports = router;
