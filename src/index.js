import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCard.js'
import Cors from 'cors';

// password- UHEZrDhUjj2lNqYy
const dbURL = `mongodb+srv://admin:UHEZrDhUjj2lNqYy@cluster0.vqago.mongodb.net/Video-Library-DB?retryWrites=true&w=majority`

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(Cors())

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.post("/playlist", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/playlist', (req, res) => {


    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })

})

app.delete("/playlist/:id", async(req, res) => {

    try {

        const del = await Cards.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(del)

    } catch (err) {
        res.status(500).send(err)
    }
})


app.get("/", (req, res) => res.status(200).send("Hello awesome programers"));

app.listen(port, () => console.log(`listening on port: ${port}`))