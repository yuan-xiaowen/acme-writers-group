import axios from "axios"

const deleteOneStory = async(user)=>{
  const response = await axios.delete(`/api/users/${user.id}/stories`)
  return response.data
}

export default deleteOneStory