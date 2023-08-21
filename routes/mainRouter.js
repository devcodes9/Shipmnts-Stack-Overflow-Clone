const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send(
    "Checkout link: " + "<a href = 'https://documenter.getpostman.com/view/17874220/2s9Y5Ty4UF'>PostMan Documentation</a>"
  );
});

module.exports = router;
