
const BASE_URL="http://localhost:3000";


// all users
export const getUsers = async()=>{
    const response = await fetch(`${BASE_URL}/api/users`);
    const data = await response.json();
    return data;
}

// single user
export const getUser = async(userId)=>{
    const response = await fetch(`${BASE_URL}/api/users/${userId}`);
    const data = await response.json();
    if(data) return data;
    return{};
}

// add new employee
export async function addUser(formData){
    try {
        const Option={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}/api/users` , Option);
        const data = response.json();
        return data;

    } catch (error) {
        return error
    }
}

//Update New Employee
export async function updateUser(userId,formData){
        const Option={
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}/api/users/${userId}` , Option);
        const data = response.json();
        return data;
}

//Delete
export async function deleteUser(userId){
    const Option={
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
    }
    const response = await fetch(`${BASE_URL}/api/users/${userId}` , Option);
    const data = response.json();
    return data;
}
