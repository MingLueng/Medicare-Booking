import mongoose from "mongoose";
import Doctor from'./DoctorSchema.js';
const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware `pre` để tự động populate thông tin người dùng trước khi tìm kiếm các đánh giá
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo', // Chỉ lấy ra trường 'name' và 'photo' của user
  });
  next();
});

// Phương thức tĩnh để tính toán và cập nhật số lượng, điểm đánh giá trung bình của bác sĩ
reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId }, // Lọc theo ID bác sĩ
    },
    {
      $group: {
        _id: '$doctor',
        numOfRating: { $sum: 1 }, // Tổng số lượng đánh giá
        avgRating: { $avg: '$rating' }, // Điểm đánh giá trung bình
      },
    },
  ]);
  // var aggregate = await _reviewCollection.Aggregate()
  // .Match(r => r.Doctor == doctorId)
  // .Group(r => r.Doctor, g => new
  // {
  //     DoctorId = g.Key,
  //     NumOfRating = g.Count(),
  //     AvgRating = g.Average(r => r.Rating)
  // })
  // .ToListAsync();

  if (stats.length > 0) {
    // Nếu có đánh giá, cập nhật số lượng và điểm trung bình cho bác sĩ
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: stats[0].numOfRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    // Nếu không có đánh giá nào, cập nhật mặc định là 0
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: 0,
      averageRating: 0,
    });
  }
};

// Middleware `post-save` để tự động tính toán lại số lượng và điểm đánh giá trung bình sau khi một review mới được lưu
reviewSchema.post('save', function () {
  // `this` trỏ tới đối tượng review hiện tại
  this.constructor.calcAverageRatings(this.doctor);
});

export default mongoose.model('Review', reviewSchema);
