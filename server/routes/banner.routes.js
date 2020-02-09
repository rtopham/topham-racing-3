import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import bannerCtrl from '../controllers/banner.controller'

const router = express.Router()

router.route('/api/banners/new/:userId')
  .post(authCtrl.requireSignin, bannerCtrl.create)

router.route('/api/dashboard/banners/by/:userId')
  .get(authCtrl.requireSignin, bannerCtrl.listBannersByUser)

router.route('/api/banners/by/:userId')
  .get(bannerCtrl.listBannersByUserNoAuth)

router.route('/api/banners/:bannerId')
  .delete(authCtrl.requireSignin, bannerCtrl.isPoster, bannerCtrl.remove)

router.route('/api/banners/photo/:bannerId')
  .get(bannerCtrl.photo)


router.param('userId', userCtrl.userByID)
router.param('bannerId', bannerCtrl.bannerByID)

export default router
