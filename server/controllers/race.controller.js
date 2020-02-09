import Race from '../models/race.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'


const create = (req, res, next) => {

    let race = new Race(req.body)
    race.postedBy= req.profile
    race.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.status(200).json({
        message: "Successfully added race!"
      })
    })
}

const update = (req, res) => {
//console.log(req.race._id)
//console.log(req.body)
  Race.findByIdAndUpdate(req.race._id, {$set:{series: req.body.series, race_name: req.body.race_name, race_date:req.body.race_date, location:req.body.location,time:req.body.time,rank:req.body.time,rank:req.body.rank,category:req.body.category}},{runValidators:true})
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}

const raceByID = (req, res, next, id) => {
  Race.findById(id).populate('postedBy', '_id name').exec((err, race) => {
    if (err || !race)
      return res.status('400').json({
        error: "Race not found"
      })
    req.race = race
    next()
  })
}

const listByUser = (req, res) => {
  Race.find({postedBy: req.profile._id})
 // .populate('comments', 'text created')
//  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .sort('-race_date')
  .exec((err, races) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(races)
  })
}


const listByUserSearch = (req, res) => {

  const filter={postedBy: req.profile._id};
	
if (req.query.series) filter.series = req.query.series;
if (req.query.rank) filter.rank = parseInt(req.query.rank);
if (req.query.rank_lte || req.query.rank_gte) filter.rank={};
if (req.query.rank_lte) filter.rank.$lte = parseInt(req.query.rank_lte,10);
if (req.query.rank_gte) filter.rank.$gte = parseInt(req.query.rank_gte,10);
if (req.query.series_ne){
filter.series={}
filter.series.$nin = req.query.series_ne
} 


if (req.query.race_date){
  
   let requestedYear = parseInt(req.query.race_date);
   let startDate =new Date(requestedYear+"-01-01")
   let stopDate =new Date (requestedYear+"-12-31")

   filter.race_date= {"$gte": startDate, "$lt": stopDate};
   
}


  Race.find(filter)
  .populate('postedBy', '_id name')
  .sort('-race_date')
  .exec((err, races) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(races)
  })
}

const remove = (req, res) => {
  let race = req.race
    race.remove((err, deletedRace) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(deletedRace)
    })
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.race.photo.contentType)
    return res.send(req.race.photo.data)
}

const isPoster = (req, res, next) => {
  let isPoster = req.race && req.auth && req.race.postedBy._id == req.auth._id
  if(!isPoster){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  listByUser,
  listByUserSearch,
  create,
  update,
  raceByID,
  remove,
  photo,
  isPoster
}
