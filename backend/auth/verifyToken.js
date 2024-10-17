import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';



export const authenticate = async (req,res,next)=>{
    // get token from headers

    const authToken = req.headers.authorization

    // check token is exists

    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(401).json({success:false,message:'No token, authorization denied'})
    }
    try {
        const token = authToken.split(" ")[1];
        //verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.userId = decoded.id
        req.role = decoded.role
        next(); // must be call next function
    } catch (error) {
        if(error.name ==='TokenExpiredError'){
            return res.status(404).json({message:'Token is expired'})
        }
        return res.status(404).json({success:false,message:'Invalid token'})
    }
}





export const restrict = roles => async (req, res, next) => {
    debugger
    const userId = req.userId; // Lấy userId từ request (được đặt trước đó bởi các middleware khác)
    let user;

    // Tìm người dùng có ID là userId trong bảng User (bệnh nhân)
    const patient = await User.findById(userId);
    // Tìm người dùng có ID là userId trong bảng Doctor (bác sĩ)
    const doctor = await Doctor.findById(userId);

    // Nếu tìm thấy bệnh nhân, gán bệnh nhân đó vào biến user
    if (patient) {
        user = patient;
    }

    // Nếu tìm thấy bác sĩ, gán bác sĩ đó vào biến user
    if (doctor) {
        user = doctor;
    }
    // method includes là kiểm tra xem một chuỗi hoặc một phần tử có tồn tại trong một chuỗi hay mảng không.
    // Kiểm tra vai trò (role) của người dùng có nằm trong danh sách roles được cho phép không
    if (!roles.includes(user.role)) {
        return res.status(404).json({ success: false, message: 'You are not authorized' });
    }

    // Nếu user có role nằm trong danh sách roles cho phép, gọi hàm next() để tiếp tục thực thi request
    next();
};