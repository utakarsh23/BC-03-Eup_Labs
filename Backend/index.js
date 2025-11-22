const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {jsonParser} = require("./middlewares/index");
const {connectMongoDB} = require("./db/connection");
const DishRouter = require("./Router/DishRouter");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 7870;
const mongoURI = process.env.MONGO_URI;
const Dish = require("./Model/Dish");

const app = express();
const server = http.createServer(app);

app.use(jsonParser());

connectMongoDB(mongoURI).then(r => console.log("MongoDB Connected!!"))
    .catch(err => console.log("Error, Can't connect to DB", err));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

app.set("io", io);



Dish.watch().on("change", (change) => {
    const io = app.get("io");

    if (change.operationType === "update" || change.operationType === "replace") {
        Dish.findById(change.documentKey._id).then(updatedDish => {
            if (io) io.emit("dish-updated", updatedDish);
        });
    }

    if (change.operationType === "insert") {
        Dish.findById(change.fullDocument._id).then(newDish => {
            if (io) io.emit("dish-created", newDish);
        });
    }
});


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use("/dishes/v1/", DishRouter);

server.listen(PORT, () => (console.log(`Listening to Port ${PORT}`)));
