const express = require("express");
const { spawn } = require("child_process");

const app = express();
app.use(express.json());

app.post("/move", (req, res) => {
    const fen = req.body.fen;
    const stockfish = spawn("stockfish");

    stockfish.stdin.write(`position fen ${fen}\n`);
    stockfish.stdin.write("go depth 15\n");

    stockfish.stdout.on("data", (data) => {
        const bestMove = data.toString().match(/bestmove\s(\S+)/)[1];
        res.json({ bestMove });
    });
});

app.listen(3000, () => console.log("Stockfish AI running on port 3000"));
