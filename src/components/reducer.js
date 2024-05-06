
const intialState={
    fetchData:[],
    addData:{},
    deleteData:{},
    editData:{}
}
const reducer=(state = intialState,action)=>{
    switch(action.type){
        case "Fetch_Data":
            return {...state,fetchData:[...state.fetchData,action.payload]};
        case "Add_Data":
            return {...state,fetchData:[...state.fetchData,action.payload]};
        case "Delete_Data":
            return {...state,fetchData:[action.payload]};
        case "Edit_Data":
            return {...state,fetchData:[action.payload]}
        default:
            return state;
        }
}

export default reducer;
