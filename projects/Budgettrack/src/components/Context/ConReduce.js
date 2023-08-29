export const conReduce = (state, action) => {
    let transaction; 

    switch(action.type){
        case "DELETE_TRANSACTION":
            transaction = state.filter((t) => t.id !== action.payload);
            return transaction;

        case "ADD_TRANSACTION":
            transaction = [action.payload, ...state];
            return transaction;

        case "REMOVE_ALL":
            transaction = [];
            return transaction;
        
        default:
            return state;
    }
}