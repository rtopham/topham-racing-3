import mongoose from 'mongoose'
const BannerLinkSchema = new mongoose.Schema({

  filename: {type: String},


  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'}

})

BannerLinkSchema.virtual('uniqueId')
    .get(function() {
        return this.filename.replace(path.extname(this.filename), '');
    });


export default mongoose.model('BannerLink', BannerLinkSchema)
