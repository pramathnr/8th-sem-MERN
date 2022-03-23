const app = require("./app")

const dotenv = require("dotenv");

const connectMongodb = require("./config/mongodb");

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`)
    process.exit(1);
});


//config
dotenv.config({path:"backend/config/config.env"})

//conecting to MongoDB
connectMongodb()

const server = app.listen(process.env.PORT, ()=>{

    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})


//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection `)
    server.close(()=>{
        process.exit(1);
    });
});