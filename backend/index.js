import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import DoctorRoute from './Routes/doctor.js';
import ReviewRoute from './Routes/review.js';
import BookingRoute from './Routes/booking.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


const corsOptions = {
    origin:true,
};
//Routes mặc định
app.get('/',(req,res)=>{
    res.send('Api is working');
});

// Kết nối cơ sở dữ liệu
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB database is connected")
    } catch (err) {
        console.log("MongoDB database connection failed")
    }
}

//middleware 
//middleware là các hàm trung gian được sử dụng để xử lý các yêu cầu 
//(requests) và phản hồi (responses) giữa client và server.
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//Routes
app.use('/api/v1/auth',authRoute); //domain/api/v1/auth/register

app.use('/api/v1/users',userRoute); 

app.use('/api/v1/doctors',DoctorRoute); 

app.use('/api/v1/reviews',ReviewRoute); 

app.use('/api/v1/bookings',BookingRoute); 

// Kết nối DB và khởi động server
app.listen(port, () => {
    connectDB();
    console.log("Server is running on port " + port);
});

