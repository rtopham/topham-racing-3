import Banner from '../models/banner.model'
import _ from 'lodash'
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
    let banner = new Banner(fields)
    banner.postedBy= req.profile
    if(files.photo){
      banner.photo.data = fs.readFileSync(files.photo.path)
      banner.photo.contentType = files.photo.type
    }
    banner.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  })
}

const bannerByID = (req, res, next, id) => {
  Banner.findById(id).populate('postedBy', '_id name').exec((err, banner) => {
    if (err || !banner)
      return res.status('400').json({
        error: "Banner not found"
      })
    req.banner = banner
    next()
  })
}

const listBannersByUser = (req, res) => {

  Banner.find({postedBy: req.profile._id})
  .populate('postedBy', '_id name')
//  .sort('-created')
  .exec((err, banners) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(banners)
  })
}

const listBannersByUserNoAuth = (req, res) => {
  Banner.find({postedBy: req.profile._id})
  .populate('postedBy', '_id name')
//  .sort('-created')
  .exec((err, banners) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(banners)
  })
}


const remove = (req, res) => {
  let banner = req.banner
    banner.remove((err, deletedBanner) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(deletedBanner)
    })
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.banner.photo.contentType)
    return res.send(req.banner.photo.data)
}

const isPoster = (req, res, next) => {
  let isPoster = req.banner && req.auth && req.banner.postedBy._id == req.auth._id
  if(!isPoster){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  listBannersByUser,
  listBannersByUserNoAuth,
  create,
  bannerByID,
  remove,
  photo,
  isPoster
}
