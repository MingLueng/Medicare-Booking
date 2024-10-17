import {useContext} from 'react'
import { authContext } from '../context/authContext'
import { Navigate } from 'react-router-dom'
const ProtectedRoutes = ({children, allowedRoles}) => {
    const {token, role} = useContext(authContext);
        //Phương thức includes() của mảng sẽ kiểm tra xem mảng 
        //allowedRoles có chứa giá trị role hay không
        const isAllowed = allowedRoles.includes(role);
        const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />;
        return accessibleRoute;
        
    }

export default ProtectedRoutes;
