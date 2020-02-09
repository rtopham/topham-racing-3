import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import raceCtrl from '../controllers/race.controller'

const router = express.Router()

router.route('/api/races/new/:userId')
  .post(authCtrl.requireSignin, raceCtrl.create)

router.route('/api/races/by/:userId')
  .get(authCtrl.requireSignin, raceCtrl.listByUser)

router.route('/api/races/feed/:userId')
  .get(raceCtrl.listByUserSearch) 

router.route('/api/races/:raceId')
  .put(authCtrl.requireSignin, raceCtrl.isPoster, raceCtrl.update)
  .delete(authCtrl.requireSignin, raceCtrl.isPoster, raceCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('raceId', raceCtrl.raceByID)

export default router
