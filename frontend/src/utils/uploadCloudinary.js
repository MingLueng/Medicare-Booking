const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadImageToCloudinary = async (file) =>{
debugger
    const uploadData = new FormData();

    uploadData.append('file',file);
    uploadData.append('upload_preset',upload_preset);
    uploadData.append('cloud_name',cloud_name);


    //fetch có thể được sử dụng để gửi các yêu cầu HTTP như GET, POST, PUT, 
    //DELETE tới server hoặc API để lấy hoặc gửi dữ liệu.
    //fetch trả về một Promise, có nghĩa là nó làm việc bất đồng bộ. Bạn có thể sử
    // dụng .then() và .catch() để xử lý kết quả trả về từ yêu cầu.
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
        method:'post',
        body:uploadData
    });

    const data = await res.json();

    return data;

}
export default uploadImageToCloudinary;