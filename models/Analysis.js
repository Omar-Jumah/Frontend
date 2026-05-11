import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
    ad_text: String,
    description_G: String,
    bio: String,
    hashtags: String,

    created_at: {
        type: Date,
        default: Date.now
    }
});

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;