require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const routes =  require("./routes/routed");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(routes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.error(err));

app.listen(process.env.PORT||5000, () => console.log(`Server running on port ${process.env.PORT}`));
