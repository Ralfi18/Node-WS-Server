const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const options = { cors: { origin: "*" } };
const io = new Server(server, options);
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const secret = "efd76f6cdcc8944645c073949cf34181623e64cf32b24d3933fef9029813d075183008aa3f543e471897c76978b757e947c667ad8e663753b91c5fae6ba2434b";
// const yourPassword = "someRandomPasswordHere";
// get config vars
dotenv.config();
// access config var
const secret = process.env.TOKEN_SECRET;


app.use(cors({
	origin: [
		"http://localhost:3001", 
		"http://localhost:3000"
	] 	
}));

app.get("/", (req, res) => {
	res.send("<h1>TEST SERVER</h1>"+  require('crypto').randomBytes(64).toString('hex') );
});

app.get("/create-pass", (req, res) => {
	return false;
	const yourPassword  = req.query.password;

	if(yourPassword) {
		bcrypt.genSalt(saltRounds, (err, salt) => {
		    bcrypt.hash(yourPassword, salt, (err, hash) => {
		        // Now we can store the password hash in db.
		        res.send("<p>password: "+hash+"</p>");
		    });
		});
	}
});


app.get("/get-user", (req, res) => {
	// console.log( secret )
	let user = null;
	if(req.query.username && req.query.password) {
		const con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "cr00n",
		  	database: "react-sockets"	
		});
		con.connect(function(err) {
			if (err) {
				// console.error('error connecting: ' + err.stack);
				return null;
			}	
			// console.log("Connected!");
			con.query("SELECT * FROM users WHERE email = ?", [req.query.username.trim()], function (err, result, fields) {
				if (err) throw err;
				// console.log(result.length)
				if(result && result.length) {
					
					// console.log(result)
					bcrypt.compare(req.query.password, result[0].password, function(err, response) {
						// console.log(response)
			  			if(response == true) {
			  				const token = jwt.sign({
							  exp: Math.floor(Date.now() / 1000) + (60 * 60),
							  data: { 
							  	userId: result[0].id, 
							  	userEmail: result[0].email,
							  	name: result[0].first_name + " " + result[0].last_name
							  }
							}, secret);
							con.query("UPDATE users SET token = ? WHERE id= ? LIMIT 1", [token, result[0].id], function (err, result, fields) {
								// console.log(err, result)
							})	
			  				user = {
								loggedIn: true,
								data: {
									id: result[0].id,
									name: result[0].first_name + " " + result[0].last_name,
									email: result[0].email,
									token
								}
							}
							// console.log( user )
							res.json(user);
			  			} else {
			  				res.json(user);
			  			}
					})
				} else {
					res.json(user);
				}
			});
		});
	} 
	// res.json(user);
});

io.on("connection", (socket) => {


	console.log("new connection");
  	socket.on("disconnect", (reason) => {
  		console.log(reason)
  	});	

  	socket.on("appInit", function(data){
  		// verify a token symmetric - synchronous
  		// console.log( "appInit" , data)
  		try {
		  	const decoded = jwt.verify(data.token, secret);
		  	console.log( decoded )
		    //io.emit("message", msg); // Send message to sender
	    	socket.broadcast.emit("login", "User " + decoded.data.name + " loged in!"); // Send message to everyone BUT sender
	    	io.to(socket.id).emit('hey', 'hey')
		} catch(err) {
			// err
			// console.log( err )
			io.in(socket.id).disconnectSockets();		
		}
  	})

  	socket.on("logout", function(socketID) {
  		console.log( "Logout: ", Object.keys(io.sockets._ids));
  // 		Object.values(io.of("/").connected).forEach(function(s) {
  // 			console.log(s.id)
		//     // s.disconnect(true);
		// });
  		if(socketID) {

			io.in(socketID).disconnectSockets();	
  		}
		
  	})

  	socket.on("message", function(data) {
  		// verify a token symmetric - synchronous
  		console.log( "TEST message" )
  		try {
		  	const decoded = jwt.verify(data.token, secret);
  			// console.log(decoded) 
	  		// console.log(socket.id + ": " + data.msg);
		    //io.emit("message", msg); // Send message to sender
	    	socket.broadcast.emit("message", data.msg); // Send message to everyone BUT sender
		} catch(err) {
			// err
			// console.log( err )
			io.in(socket.id).disconnectSockets();		
		}
  	});
});


server.listen(8080, () => {
	console.log( "listen on port *:8080" );
});

// const options = { cors: { origin: "*" } };
// const io = require("socket.io")(options);
// io.on("connection", (socket) => {
// 	console.log("connection", socket.id)
// });
// io.listen(8080);


// const httpServer = require("http").createServer();
// const options = { /* ... */ };
// const io = require("socket.io")(httpServer, options);
// io.on("connection", socket => { /* ... */ });
// httpServer.listen(3000);
