var mysql = require('mysql');

 
module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection({
                host: 'localhost',
                port: 3306,
                user: 'root',   
                password: '3681',
                database: 'university_list'  
            })
        }
    }
}();