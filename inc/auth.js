const mysql = require("mysql");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.TOKEN_SECRET;
/** */
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
/** */
const findUser = function(con, req) {
	return new Promise(function(resolve, reject){
		try {
			const result = con.query("SELECT * FROM users WHERE email = ?", [req.query.username.trim()], function (err, result, fields) {
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
const updateToken = function(con, user) {
	return new Promise(function(resolve, reject){
		try {
			if(user) {
				con.query("UPDATE users SET token = ? WHERE id= ? LIMIT 1", [user.token, user.id], function (err, result, fields) {
					if(err) {
						reject(error)
					} else {
						resolve(result);
					}
				})
			} else {
				resolve(false);
			}

		}  catch(err) {
			reject(err)
		}
	});
}
/** */
const checkPassCrypt = function(con, req, result) {
	return new Promise(function(resolve, reject){
		let user = null;
		try {
			if(result && result.length) {

				bcrypt.compare(req.query.password, result[0].password, function(err, response) {
		  			if(response == true) {
		  				const token = jwt.sign({
						  exp: Math.floor(Date.now() / 1000) + (60 * 60),
						  data: { 
						  	userId: result[0].id, 
						  	userEmail: result[0].email,
						  	name: result[0].first_name + " " + result[0].last_name
						  }
						}, secret);	
		  				user = {
							loggedIn: true,
							data: {
								id: result[0].id,
								name: result[0].first_name + " " + result[0].last_name,
								email: result[0].email,
								token
							}
						}
		  			}
		  			resolve(user);
				});
			} else {
				resolve(user);
			}	
		}  catch(err) {
			reject(err)
		}
	});
}
/** */
exports.getUser = async function(req, res) {
	if(req.query.username && req.query.password) {
		const con = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
		  	database: process.env.DB_NAME	
		});
		const tryConnect = await connect(con);
		const result = await findUser(con, req);
		const user = await checkPassCrypt(con, req, result);
		const setToken = await updateToken(con, user ? user.data : null);
		return user;
	} else {
		return null;
	}
}

exports.register = async function() {

}

exports.generatePassword = async function() {

}