const express = require("express");

const authRouter = require("./game");

const router = express();

router.use("/game", authRouter);

module.exports = router;
