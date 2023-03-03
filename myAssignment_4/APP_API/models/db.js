const mongoose = require('mongoose');

// const dbUri="";

const dbUri="mongodb+srv://iamroshan8055:Iamroshan_8055@cluster0.ugwwu.mongodb.net/test";


// if(process.env.NODE_ENV="PRODUCTION") {
//     dbUri="prod_conn_str";
// }

mongoose.connect(dbUri, {dbName:'recipeDB'});

// var conn = mongoose.createConnection("");
// var conn2 = mongoose.createConnection("");

// Connection Events
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to "+ dbUri)
});
mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error: " + err)
});
mongoose.connection.on("disconnection", function(){
    console.log("Mongoose disconnection ")
});

// To be called when process is required or terminated 
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected through ",msg);
        callback();
    });
};

// for app termination
process.on('SIGNT', function(){
    gracefulShutdown('app', function(){
        process.exit(0);
    });
});

// for nodemon restarts
process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2')
    });
});

require('./recipe')