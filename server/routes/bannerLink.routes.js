import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import bannerLinkCtrl from '../controllers/bannerLink.controller'

const router = express.Router()

router.route('/api/bannerlinks/new/:userId')
  .post(authCtrl.requireSignin, bannerLinkCtrl.create)

router.route('/api/dashboard/bannerlinks/by/:userId')
  .get(authCtrl.requireSignin, bannerLinkCtrl.listBannerLinksByUser)

router.route('/api/bannerlinks/by/:userId')
  .get(bannerLinkCtrl.listBannerLinksByUserNoAuth)

router.route('/api/bannerlinks/:bannerLinkId')
  .delete(authCtrl.requireSignin, bannerLinkCtrl.isPoster, bannerLinkCtrl.remove)

//router.route('/api/banners/photo/:bannerId')
//  .get(bannerCtrl.photo)

router.param('userId', userCtrl.userByID)
router.param('bannerLinkId', bannerLinkCtrl.bannerLinkByID)

export default router
