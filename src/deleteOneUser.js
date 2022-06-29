import axios from "axios"

const deleteOneUser = async(user)=>{
    const response = await axios.delete(`/api/users/${user.id}`)
    return response.data
}

export default deleteOneUser