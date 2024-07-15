const express = require('express');
const { connectToMongoDB } = require('./connect');
const {checkForAuthentication,restrictTo}=require('./middlewares/auth');

const path=require('path');
const cookieParser=require('cookie-parser');



const urlRoute = require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');


const app = express();
const port = 8000;

app.set('view engine',"ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use(checkForAuthentication)
app.use('/url', restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);



app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    console.log(`Received request for shortId: ${shortId}`);
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { VisitHistory: { timestamp: Date.now() } } },
            { new: true }  // return the updated document
        );

        if (!entry) {
            console.log(`No entry found for shortId: ${shortId}`);
            return res.status(404).json({ error: 'Short URL not found' });
        }
        console.log(`Redirecting to: ${entry.redirectURL}`); // Debugging output
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error during redirect:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

connectToMongoDB('mongodb://localhost:27017/shorturl')
    .then(() => console.log('MongoDB connected!'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the application if the DB connection fails
    });

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
