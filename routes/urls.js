import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { validateUrl } from "../utils.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const router = express.Router();

router.post("/", async (req, res) => {
  const { originalUrl } = req.body;
  const base = process.env.BASE;
  const urlId = nanoid(5);
  if (validateUrl(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });
      if (url) {
        return res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;
        let url = new Url({
          urlId,
          originalUrl,
          shortUrl,
          accessCount: 0,
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid URL");
  }
});
router.get("/:urlId/stats", async (req, res) => {
  try {
    const urlId = req.params.urlId;
    const url = await Url.findOne({ urlId });
    if (url) {
      return res.status(200).json(url);
    } else {
      return res.status(404).json("Not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Server Error");
  }
});
router.get("/:urlId", async (req, res) => {
  try {
    const urlId = req.params.urlId;
    const url = await Url.findOne({
      urlId,
    });
    if (url) {
      return res.status(200).json(url);
    } else {
      return res.status(404).json("Not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Server Error");
  }
});
router.put("/:urlId", async (req, res) => {
  const { urlId } = req.params;
  const { newUrl } = req.body;
  const base = process.env.BASE;
  if (validateUrl(newUrl)) {
    try {
      let url = await Url.findOne({ urlId });
      if (url) {
        let updatedUrl = await Url.findOneAndUpdate(
          { urlId },
          { originalUrl: newUrl },
          { new: true }
        );
        return res.json(updatedUrl);
      } else {
        res.status(404).json("Not found");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid URL");
  }
});
router.delete("/:urlId", async (req, res) => {
  try {
    const urlId = req.params.urlId;
    const url = await Url.findOneAndDelete({ urlId });
    if (url) {
      return res.status(204).json("Deleted");
    } else {
      return res.status(404).json("Not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Server Error");
  }
});



export default router;
