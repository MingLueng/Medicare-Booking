import User from '../models/UserSchema.js';
import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';
export const updateUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id,{$set:req.body}, {new:true})

        res.status(200)
        .json({success:true, 
            message:'successfully updated',
             data:updatedUser});
    } catch (error) {
        res.status(500)
        .json({success:false,
             message:'failed updated'});
    }
}

export const deleteUser = async(req,res)=>{
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)

        res.status(200)
        .json({success:true, 
            message:'successfully deleted'
             });
    } catch (error) {
        res.status(500)
        .json({success:false,
             message:'failed to deleted'});
    }
}

export const getSingleUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const users = await User.findById(id).select("-password")

        res.status(200)
        .json({success:true, 
            message:'User found',
             data:users});
    } catch (error) {
        res.status(404)
        .json({success:false,
             message:'No user found'});
    }
}

export const getAllUser = async(req,res)=>{

    try {
        const users = await User.find({}).select("-password")
        res.status(200)
        .json({success:true, 
        data: users,message:'User found'});
    } catch (error) {
        res.status(404)
        .json({success:false,
             message:'No user found'});
    }
}

export const getUserProfile = async(req,res)=>{
    const userId = req.userId;

    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        const {password, ...rest} = user._doc;
        res.status(200).json({success:true, message:'Profile info is getting',data:{...rest}});

    } catch (error) {
        res.status(500).json({success:false, message:'Something went wrong, cannot get'});
    }
}

export const getMyAppointments = async(req,res)=>{
 
    try {
        // step -1: retrieve appointments from booking
        const bookings = await Booking.find({user:req.userId})

        // step -2: extract doctor ids from appointments booking
        const doctorIds= bookings.map(e=>e.doctor.id)

        // step -3: retrieve doctors using 

        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')
        res.status(200).json({success:true, message:'Appointments are getting',data:doctors});
    } catch (error) {
        //console.log(error)
        return res.status(500).json({success:false, message:'Something went wrong, cannot get'});
    }
}
