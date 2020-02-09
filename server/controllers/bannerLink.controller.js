import BannerLink from '../models/bannerLink.model'
import _ from 'lodash'
import path from 'path'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable' 
import fs from 'fs'

const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
 
    let bannerLink = new BannerLink(fields)
    bannerLink.postedBy= req.profile
    let imgUrl = ''
//    console.log('getting here')
const saveBanner =() =>{    
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for(let i=0; i<6; i+=1){
      imgUrl += possible.charAt(Math.floor(Math.random()*possible.length));
  }

  BannerLink.find({filename: imgUrl}, (err, banners)=>{

    if(banners.length>0){
        saveBanner();
    }else{
    
    const tempPath= files.photo.path
    const ext = path.extname(files.photo.name).toLowerCase()
//    let imgUrl=path.basename(files.photo.name.toLowerCase(),ext)

//use following for production
//    const targetPath = path.resolve(`client/public/banners/${imgUrl}${ext}`); 

//use following for production--docker valume
const targetPath = path.resolve(`public/banners/${imgUrl}${ext}`);

    bannerLink.filename=imgUrl+ext
//    fs.rename(tempPath,targetPath, (err) =>{
//      if (err) throw err
//    })

    fs.copyFile(tempPath,targetPath, (err) =>{
      if (err) throw err
    })

    bannerLink.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  
  }//end of generateName
  })
}
saveBanner()
})
}

const bannerLinkByID = (req, res, next, id) => {
  BannerLink.findById(id).populate('postedBy', '_id name').exec((err, bannerLink) => {
    if (err || !bannerLink)
      return res.status('400').json({
        error: "Banner not found"
      })
    req.bannerLink = bannerLink
    next()
  })
}

const listBannerLinksByUser = (req, res) => {
  BannerLink.find({postedBy: req.profile._id})
  .populate('postedBy', '_id name')
//  .sort('-created')
  .exec((err, bannerLinks) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(bannerLinks)
  })
}

const listBannerLinksByUserNoAuth = (req, res) => {
  BannerLink.find({postedBy: req.profile._id})
  .populate('postedBy', '_id name')
//  .sort('-created')
  .exec((err, bannerLinks) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(bannerLinks)
  })
}


const remove = (req, res) => {
  let bannerLink = req.bannerLink
    bannerLink.remove((err, deletedBanner) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      } else{ 
      fs.unlink(path.resolve(`client/public/banners/${bannerLink.filename}`), (err =>{if(err) throw err})) 

      res.json(deletedBanner)
      }
    })
}

const isPoster = (req, res, next) => {
  let isPoster = req.bannerLink && req.auth && req.bannerLink.postedBy._id == req.auth._id
  if(!isPoster){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  listBannerLinksByUser,
  listBannerLinksByUserNoAuth,
  create,
  bannerLinkByID,
  remove,
  isPoster
}
