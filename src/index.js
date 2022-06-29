import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import Users from './component/Users'
import HashPage from './component/HashPage'
import createAUser from './component/createAUser'
import deleteOneUser from './deleteOneUser'
import {faker}from '@faker-js/faker'


class App extends React.Component{
    constructor(){
      super(),
      this.state = {
        users:[],
        userId:''
      },
      this.addAUser = this.addAUser.bind(this)
      this.deleteAUser = this.deleteAUser.bind(this)
    }
    async componentDidMount(){
      let response = await axios.get('/api/users')
      this.setState({users:response.data})
      window.addEventListener('hashchange',()=>{
        const userId = window.location.hash.slice(1)
        this.setState({userId:userId})   
      })

    }
    async addAUser(){
      const newUser = await createAUser({name:faker.name.findName(),bio: faker.lorem.paragraph(1)})
      const allUsers = [...this.state.users,newUser]
      this.setState({users:allUsers})
    }
    async deleteAUser(user){
      const deleted = await deleteOneUser(user)
      const allUsers = this.state.users.filter(_user=>_user.id !==user.id)
      this.setState({users:allUsers})
    }
    render(){
        const allUsers = this.state.users
        const idx = this.state.userId
        const addAUser = this.addAUser
        const deleteAUser = this.deleteAUser
        return (
          <div>
            <div id = 'main'> 
              <div id = 'users'>
                <h2>Users ({allUsers.length})</h2>
                <Users users = {allUsers} userId = {idx} deleteOne={deleteAUser}/>
                <button onClick={addAUser}>add a User</button>
              </div>
              <div id ='stories'>
                {
                    idx !=='' ? <HashPage userId = {idx} />:null
                }
              </div>
            </div>
          </div>
        )
    }
}

const root = document.querySelector('#root')
ReactDOM.render(
    <App />,
    root
)