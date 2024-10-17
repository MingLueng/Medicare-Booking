import express from "express";
import { getAllReview,createReviews } from "../Controller/reviewController.js";
import { authenticate,restrict } from "../auth/verifyToken.js";

const router = express.Router({mergeParams:true})


router.route('/').get(getAllReview).post(authenticate, restrict(["patient"]),createReviews)

export default router;