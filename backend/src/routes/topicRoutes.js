 const express = require("express");
 const { getTopics,createTopic,updateTopic , deleteTopic } = require("../controllers/topicController");
 const { protect,adminProtect } = require("../middlewares/authMiddleware")

 const router = express.Router();

router.get("/",protect,getTopics);
router.post("/",protect,adminProtect,createTopic);
router.put("/:id",protect,adminProtect,updateTopic);
router.delete("/:id",protect,adminProtect,deleteTopic);

modeule.exports =router;