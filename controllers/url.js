const ShortUniqueId = require('short-unique-id');
const URL = require('../models/url');

const uid = new ShortUniqueId({ length: 8 });

async function generateNewShortURL(req, res) {
    const {url} = req.body;
    console.log(`Received URL: ${url}`);
    if (!url) return res.status(400).json({ error: 'url is required!' });

    const shortID = uid.rnd();  // uid should be called correctly to generate an ID
    await URL.create({
        shortId: shortID,
        redirectURL: url,
        VisitHistory: [],
        createdBy:req.user._id,
    });
    return res.render('home',{
        id:shortID,
    });
}
async function getAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.VisitHistory.length,analytics:result.VisitHistory});
}
module.exports = {
    generateNewShortURL,
    getAnalytics,
};
