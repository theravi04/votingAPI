const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB connection error:", error);
        
    }
}
connectDB();

const Vote = mongoose.model("Vote", new mongoose.Schema({
    voterId: String,
    participantId: String,
    score: Number,
}, {timeStamp: true}))

const app = express();
app.use(cors());
app.use(express.json())

app.post("/vote", async (req, res) => {
    const { voterId, participantId, score} = req.body;
    if(!voterId || !participantId || score < 1 || score > 100)
        return res.status(400).json({error: "Invalid Input"});

    const existingVote = await Vote.findOne({voterId, participantId})
    if(existingVote){
        existingVote.score = score;
        await existingVote.save();
        return res.json({message: "Vote updated successfully"});
    }
    else {
        await Vote.create({ voterId, participantId, score});
    }
    res.json({ message: "Vote Recorded!"})
})

app.get("/leaderboard", async (req, res) => {
    const results = await Vote.aggregate([
        { $group: {_id: "$participantId", totalScore: { $sum: "$score"}}},
        { $sort: { totalScore: -1}}
    ])
    const leaderboard = results.map((entry, index) => ({
        rank: index + 1,
        participant: entry._id,  // <--- This is line 51 in your error
        score: entry.totalScore
    }));
    res.json(leaderboard)
})

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}`)
)