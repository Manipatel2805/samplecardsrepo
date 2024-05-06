
export const fetchAction=(fetch)=>({
    type:"Fetch_Data",
    payload:fetch
})

export const addAction=(add)=>({
    type:"Add_Data",
    payload:add
})

export const deleteAction=(remove)=>({
    type:"Delete_Data",
    payload:remove
})

export const editAction=(edit)=>({
    type:"Edit_Data",
    payload:edit
})
