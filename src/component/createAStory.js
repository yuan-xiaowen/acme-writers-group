import axios from "axios"

const createAStory = async(newStory)=>{
    console.log('%%%%%%%%%%%')
    console.log(newStory.userId)
    const response = await axios.post(`/api/users/${newStory.userId}/stories`, newStory)
    return response.data
}

export default createAStory
