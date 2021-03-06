
import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'


const create = (req, res, next) => {
  const user = new User(req.body)
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "Successfully signed up!"
    })
  })
}

/**
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  })
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(users)
  }).select('name email updated created photo')
}

const update = (req, res, next) => {
 
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Photo could not be uploaded"
      })
    }
    let user = req.profile

    user = _.extend(user, fields)
    user.updated = Date.now()
    if(files.photo){
      user.photo.data = fs.readFileSync(files.photo.path)
      user.photo.contentType = files.photo.type
    }
    user.save((err) => {
      if (err) {
        return res.status(400).send({
          error: errorHandler.getErrorMessage(err)
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    })
  })
}

const remove = (req, res, next) => {
  let user = req.profile
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  })
}

const photo = (req, res, next) => {
  if(!req.profile.photo.data) return res.sendFile(process.cwd()+"/client/assets/images/profile-pic.png")
  if(req.profile.photo.data){
    res.set("Content-Type", req.profile.photo.contentType) 
    res.set("Content-Type", 'image/jpeg')
    return res.send(req.profile.photo.data)
  }
  
  next()
}

const stravaToken = (req, res) => {

  return res.json({id:req.profile.strava_athlete_id, token:req.profile.strava_token, expiresAt:req.profile.strava_token_expires_at, refreshToken:req.profile.strava_refresh_token})

}


export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  photo,
  stravaToken
}
