const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_writers_group')


const User = db.define('user',{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    bio:{
        type:Sequelize.TEXT,
        allowNull:false
    }
})

const Story = db.define('story',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    favorite:{
        type:Sequelize.BOOLEAN
    }
})

Story.belongsTo(User)
User.hasMany(Story)


module.exports = {
    User,Story,db
}