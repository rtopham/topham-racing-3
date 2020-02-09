import mongoose from 'mongoose'
const BannerSchema = new mongoose.Schema({
  photo: {
    data: Buffer,
    contentType: String
  },

  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'}

})

export default mongoose.model('Banner', BannerSchema)
