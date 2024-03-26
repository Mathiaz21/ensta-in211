import express from "express";

const router = express.Router();

router.get("/", (req, res)=> {
    res.send(["HELLO", "!!"])
    console.log("LOGGED !")
})

router.post("/new", (req, res) => {
    res.send(req.body)
})

export default router;