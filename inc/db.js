const mysql = require("mysql");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.TOKEN_SECRET;

const connect = function(con) {
	return new Promise(function(resolve, reject){
		try {
			const result = con.connect();
			resolve(result);
		}  catch(err) {
			reject(err)
		}
	});
}

const fetchProducts = function(con) {
	return new Promise(function(resolve, reject){
		try {
			const result = con.query("SELECT * FROM inventory", function (err, result, fields) {
				if (err) {
					reject(err)
				} else {
					resolve(result);
				}
			});
		}  catch(err) {
			reject(err)
		}
	});
}


const fetchProduct = function(con, id) {
	return new Promise(function(resolve, reject){
		try {
			const result = con.query("SELECT * FROM inventory WHERE id = ?", [id], function (err, result, fields) {
				if (err) {
					reject(err)
				} else {
					resolve(result);
				}
			});
		}  catch(err) {
			reject(err)
		}
	});
}

const updateProductHandler = function(con, product) {
	return new Promise(function(resolve, reject){
		try {
			const sql = "UPDATE inventory SET name = ?, price = ? WHERE id = ? LIMIT 1";
			const binds = [product.name, product.price, product.id];
			const result = con.query(sql, binds, function (err, result, fields) {
				if (err) {
					reject(err)
				} else {
					resolve(result);
				}
			});
		}  catch(err) {
			reject(err)
		}
	});
}

/** */
exports.getProducts = async function() {
	const con = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
	  	database: process.env.DB_NAME	
	});
	const tryConnect = await connect(con);
	const result = await fetchProducts(con);
	return result;
}

exports.updateProduct = async function(product) {
	const con = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
	  	database: process.env.DB_NAME	
	});
	const tryConnect = await connect(con);
	const update = await updateProductHandler(con, product);
	if(update && update.affectedRows == 1) {
		const result = await fetchProduct(con, product.id);
		return result;
	}
	return null;
}
