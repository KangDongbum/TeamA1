const express = require('express');
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

router.get("/",(req,res) => {
  return res.render("main/index");
});

router.post("/save_date", async (req, res) => {
  const data = JSON.stringify(req.body);
  const filePath = path.join(__dirname, "../data/date/dday.json");
  await fs.writeFile(filePath, data);
  return res.send("");
});

module.exports = router;