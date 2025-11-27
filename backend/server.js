const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
