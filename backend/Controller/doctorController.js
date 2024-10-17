import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';

export const updateDoctor = async(req,res)=>{
    const id = req.params.id;
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id,{$set:req.body}, {new:true})

        res.status(200)
        .json({success:true, 
            message:'successfully updated',
             data:updatedDoctor});
    } catch (error) {
        res.status(500)
        .json({success:false,
            message:'failed updated'});
    }
}

export const deleteDoctor = async(req,res)=>{
    const id = req.params.id;
    try {
        await Doctor.findByIdAndDelete(id)

      return  res.status(200)
        .json({
            success:true, 
            message:'successfully deleted',
            });
    } catch (error) {
        res.status(500)
        .json({
             success:false,
             message:'failed to deleted'});
    }
}

export const getSingleDoctor = async(req,res)=>{
   
    try {
        const id = req.params.id;
        const doctors = await Doctor.findById(id).populate('reviews').select("-password");

        res.status(200)
        .json({success:true, 
            message:'Doctor found',
             data:doctors});
    } catch (error) {
        res.status(404)
        .json({success:false,
             message:'No Doctor found'});
    }
}

export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query;
        let doctors;
        // Điều kiện tìm kiếm
        const searchCriteria = { isApproved: 'approved' };

        if (query) {
            searchCriteria.$or = [
                { name: { $regex: query, $options: "i" } },
                { specialization: { $regex: query, $options: "i" } }
            ];
        }

        // Tìm kiếm với tiêu chí và loại bỏ trường password
        doctors = await Doctor.find(searchCriteria).select("-password");

        // Nếu không tìm thấy bác sĩ nào, trả về thông báo
        if (doctors.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Doctor found'
            });
        }

        // Trả về danh sách bác sĩ đã tìm thấy
        res.status(200).json({
            success: true,
            message: 'Doctors found',
            data: doctors
        });
    } catch (error) {
        // Xử lý lỗi bất kỳ
        res.status(500).json({
            success: false,
            message: 'Error retrieving doctors',
            error: error.message
        });
    }
};

export const getDoctorProfile = async(req,res)=>{
    const doctorId = req.userId;

    try {
        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return res.status(404).
            json({success: false,         
            message:'Doctor not found'});
        }
        const{password, ...rest} = doctor._doc;
        const appointments = await Booking.find({doctor: doctorId});
        res.status(200).json({success:true, message:'Profile info is getting',data:{ ...rest, appointments}});
    } catch (error) {
        return res.status(500).json({success:false, message:'Something went wrong, cannot get'});
    }
}

