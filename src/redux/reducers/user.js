const initialState = {
    currentUser: {
        email: '',
        fullName: '',
        avatar: '',
        userId: '',
    }
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case "LOGIN": {
            console.log({
                ...state,
                currentUser: action.payload,
            })
            return {
                ...state,
                currentUser: action.payload,
            };
        }

        case "LOGOUT": {
            return {
                ...state,
                currentUser: {},
            };
        }

        default: {
            return state;
        }
    }
};
  
export default userReducer;
  