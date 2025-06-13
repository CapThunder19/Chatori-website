const express = require("express");
const Stall = require("../models/Stall");
const Review = require("../models/Review");
const { upload } = require("../middlewares/Upload")

const router = express.Router();

router.post('/', upload.single("dishimage"), async (req, res) => {
  try {
    const { stallname, dishname, area, openinghours, phonenumber, lng, lat } = req.body;
    const dishimage = req.file?.path;

    if (!stallname || !dishname || !area || !openinghours || !phonenumber || !dishimage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newStall = new Stall({
      stallname,
      dishname,
      area,
      openinghours,
      phonenumber,
      dishimage,
      location: {
        type: "Point",
        coordinates: [parseFloat(lng) || 0, parseFloat(lat) || 0]
      }
    });

    await newStall.save();
    res.status(201).json(newStall);
  } catch (err) {
    console.error("Create stall error:", err);
    res.status(500).json({ message: "Server error while creating stall" });
  }
});


router.get('/', async (req,res) => {
    try{
        const stalls = await Stall.find();
        res.json(stalls);
    }
    catch(err){
        res.status(500).json({message: "failed to find stalls"});
    }
})

router.get('/search', async (req,res)=>{
    try{
      const { dish } = req.query;
      const result = await Stall.find({ dishname: new RegExp(dish, 'i') });
        res.json(result);

    }
    catch(err){
        
        res.status(500).json({ message: 'Search failed' });
    }
})

router.get('/top-rated', async (req,res)=>{
    try{
       const stalls = await Stall.find().sort({ averagerating: -1 }).limit(3);


        res.json(stalls);
    }
    catch(err){
        res.status(500).json({ message: 'Could not fetch top rated stalls' });
    }
})

router.get('/nearest', async (req,res) => {
  const {lng, lat} = req.query;
  try{
    const stalls = await Stall.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            $maxDistance: 5000 
          }
        }
      });
      res.json(stalls);
  }
  catch(err){
    res.status(500).json({ message: 'Could not find nearby stalls' });
  }
});

router.get('/recommended', async (req,res)=>{
  try{
    const stalls = await Stall.find().sort({ averagerating: -1 }).limit(3);

    res.json(stalls);
  }
  catch (err) {
    res.status(500).json({ message: "Failed to fetch recommended stalls." });
  }
});

router.post('/:stallId/reviews', async (req, res) => {
  const { stallId } = req.params;
  const { username, rating, comment } = req.body;

  try {
    const review = new Review({
      username,
      stall: stallId,
      rating: Number(rating),
      comment: comment
    });

    await review.save();

    const reviews = await Review.find({ stall: stallId });
    const avgRating = (
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    ).toFixed(1);

    await Stall.findByIdAndUpdate(stallId, { 
  averagerating: avgRating, 
  numreviews: reviews.length 
});


    res.status(201).json(review);
  } catch (err) {
    console.error("Review submission failed:", err);
    res.status(500).json({ message: "Failed to add review." });
  }
});




router.get("/:stallId/reviews", async (req,res)=> {
  const { stallId } = req.params;

  try {
    const reviews = await Review.find({ stall: stallId }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to get reviews." });
  }
});

router.get('/:stallId', async (req, res) => {
  try {
    const stall = await Stall.findById(req.params.stallId);
    if (!stall) return res.status(404).json({ message: "Stall not found" });
    res.json(stall);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stall details" });
  }
});

module.exports = router;