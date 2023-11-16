import mongoose from "mongoose"

const linkSchema = new mongoose.Schema({
  longLink: {type:String, required: true},
  generatedLink: {type:String, required: true, unique: true},
})

export const Link = mongoose.model('link', linkSchema)

