import express from "express";
const router = require("./src/routes");

const app = express();

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `Server is running on port ${PORT}`);
