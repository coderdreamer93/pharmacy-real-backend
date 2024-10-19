const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

// dot config
// dotenv.config({path: './config/'})
dotenv.config();

// mongoose db
connectDB();

// rest object
const app = express();

// moddlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// app.use(colors())

// routes
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: "Welcome to Blood Bank App"
//     })
// })
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventories", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server is running in ${process.env.DEV_MODE} on PORT ${process.env.PORT}`
      .bgBlue.white
  );
});
