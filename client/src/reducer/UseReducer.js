const storedUser=localStorage.getItem("user")
export const initialState=storedUser?JSON.parse(storedUser):null;
export const reducer=(state,action)=>{
    switch(action.type){
        case "USER":
            localStorage.setItem("user",JSON.stringify(action.payload));
            return action.payload;
            default:
                return state;
    }
}