import {children, createContext,useContext,useEffect,useReducer} from "react"
import { json } from "react-router-dom";

//createContext: Được sử dụng để tạo ra một context. 
//Context API giúp chia sẻ dữ liệu giữa các component 
//mà không cần truyền qua props.

//useContext: Hook này cho phép component truy 
//cập vào context được tạo bởi createContext.

//useEffect: Hook này được sử dụng để thực hiện 
//các side effects trong functional component 
//như gọi API, xử lý DOM, hay thực hiện việc dọn dẹp.

//useReducer: Hook này giúp quản lý state
//phức tạp thông qua reducer. 
//Nó tương tự như useState, nhưng mạnh hơn 
//khi cần quản lý nhiều trạng thái liên quan.

const initialState = {
    
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
};

export const authContext = createContext(initialState);

const authReducer = (state,action)=>{
    debugger
    switch(action.type){
        case 'LOGIN_START':  
            return{
                user: null,
                role: null,
                token: null,
            };

        case 'LOGIN_SUCCESS':
            return{
                user:action.payload.user,
                token:action.payload.token,
                role:action.payload.role,
        };

        case 'LOGOUT':
            return{
                user: null,
                role: null,
                token: null,
            };
        
        default:
            return state;
}
}

export const AuthContextProvider = ({children})=>{
    debugger
    const[ state, dispatch] = useReducer(authReducer,initialState);

    useEffect(()=>{
       localStorage.setItem('user',JSON.stringify(state.user));
       localStorage.setItem('token', state.token);
       localStorage.setItem('role', state.role);
    },[state]);
    return(
        <authContext.Provider 
            value={{
                user:state.user, 
                token:state.token,
                role:state.role,
                dispatch,
                }}>
                {children}
        </authContext.Provider>
    ) 
}
