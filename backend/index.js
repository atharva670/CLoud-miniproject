const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

let waitingPlayer = null;

app.post("/match", (req, res) => {
    if (waitingPlayer) {
        res.json({ matchId: Date.now(), opponent: waitingPlayer });
        waitingPlayer = null;
    } else {
        waitingPlayer = req.body.username;
        res.json({ message: "Waiting for an opponent..." });
    }
});

module.exports.handler = serverless(app);
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.post("/saveGame", async (req, res) => {
    const { gameId, moves, winner } = req.body;
    
    await dynamoDb.put({
        TableName: "ChessGames",
        Item: { gameId, moves, winner }
    }).promise();

    res.json({ message: "Game saved!" });
});
