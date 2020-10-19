const express = require("express");
const viewController = require("../controllers/viewController");
const router = express.Router();

router.get("/", viewController.get_blogs);

router.get("/:slug", viewController.get_blog_with_slug);

module.exports = router;