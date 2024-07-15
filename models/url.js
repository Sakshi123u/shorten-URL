const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        VisitHistory: [
            {
                timestamp: { type: Date, default: Date.now }  // Changed to Date
            }
        ],
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
        }
    },
    { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const URL = mongoose.model('URL', urlSchema);  // Use 'URL' as model name

module.exports = URL;
