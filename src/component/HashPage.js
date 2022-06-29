import axios from "axios"
import React from "react"
import {faker}from '@faker-js/faker'
import createAStory from './createAStory'
import deleteOneStory from "./deleteOneStory"
import changeFavorite from "./changeFavorite"


class HashPage extends React.Component{
    constructor(){
        super(),
        this.state ={
            userId:'',
            stories:[],
            bio:'',
            name:''
        },
        this.addAStory = this.addAStory.bind(this)
        this.deleteAStory = this.deleteAStory.bind(this)
        this.Favorite = this.Favorite.bind(this)
    }
    async componentDidMount(){
        let userId = window.location.hash.slice(1)
        let response = await axios.get(`/api/users/${userId}/stories`)
        this.setState({stories:response.data})
        this.setState({userId:userId})
        response = await axios.get(`/api/users/${userId}`)
        this.setState({bio:response.data.bio})
        this.setState({name:response.data.name})
        window.addEventListener('hashchange',async()=>{
         userId = window.location.hash.slice(1)
         response = await axios.get(`/api/users/${userId}/stories`)
         this.setState({stories:response.data})
         this.setState({userId:userId})
         response = await axios.get(`/api/users/${userId}`)
         this.setState({bio:response.data.bio}) 
         this.setState({name:response.data.name})
      })  
    }
    async addAStory(){
      const newStory = await createAStory({ 
        title:faker.random.words(),
        body:faker.lorem.paragraph(5),
        favorite:faker.datatype.boolean(),
        userId:this.state.userId*1})
      const stories = [...this.state.stories,newStory]
      this.setState({stories:stories})
    }
    async deleteAStory(story){
        await deleteOneStory(story)
        const stories = this.state.stories.filter(_story=> _story.id !==story.id)
        this.setState({stories:stories})
    }
    async Favorite(userId,story){
        const stories=  await changeFavorite(userId,story)
        this.setState({stories:stories})
    }
    render(){
        const stories = this.state.stories
        const addAStory = this.addAStory
        const deleteStory = this.deleteAStory
        const changeFavorite = this.Favorite
        const bio = this.state.bio
        const name = this.state.name
        return(
            <div>
                <h2>{name} Bio</h2>
                <p>{bio}</p>
                <h2>Stories ({stories.length})</h2>
                {stories.map(story =>{
                    return(
                        <li key={story.id} >
                            {story.favorite ?<>💚 </>:null}
                            {story.title} 
                            <button onClick={()=>{deleteStory(story)}}>x</button>
                            { story.favorite ? <button onClick={()=>{changeFavorite(story.userId,story)}}>unfavorite</button>:<button onClick={()=>{changeFavorite(story.userId,story)}}>favorite</button>}  
                            <p>{story.body}</p>
                        </li>   
                    )
                })}
                <button onClick={addAStory}>add a story</button>
            </div>
        )
    }
}

export default HashPage