import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';

//get all reviews
export const getAllReview = async (req,res) =>{
    try {
        const reviews = await Review.find({});

    return res.status(200).json({sucess:true,message:"Successful",data:reviews});
    } catch (error) {
     return res.status(404)
        .json({success:false,
             message:'No found'});
    }
    
}

//create reviews

export const createReviews = async (req,res) =>{
    if(!req.body.doctor) req.body.doctor = req.params.doctorId;
    
    if(!req.body.user) req.body.user = req.userId;
    
    const newReviews = new Review(req.body);
    try {
       const savedReview = await newReviews.save();
        await Doctor.findByIdAndUpdate(req.body.doctor,{
            $push:{reviews: savedReview._id}
        })

        return res.status(200).json({success:true,message:"Review submitted", data:savedReview})
    } catch (error) {

        return res.status(500).json({success:false,message:error.message})
    }
}