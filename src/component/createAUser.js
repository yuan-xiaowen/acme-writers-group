import axios from "axios"


const createAUser = async (newUser)=>{  
    const response = await axios.post('/api/users', newUser)
    return response.data
}

export default createAUser