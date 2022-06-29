import axios from "axios"

const changeFavorite = async(userId,story)=>{
  await axios.get(`/api/stories/${story.id}`)
  const response = await axios.get(`/api/users/${userId}/stories`)
  return response.data
}

export default changeFavorite