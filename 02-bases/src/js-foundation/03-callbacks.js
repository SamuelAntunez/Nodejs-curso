const users = [
    {
        id: 1,
        name: 'John Doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    }
]

// const getUserById = function(id) {
//     const user = users.find( user => user.id === id)
//     console.log({user})
// }   



function getUserById( id, callback ) {
    const user = users.find( user => user.id === id)
    
    if( !user ) callback(`USUARIO ${id} NO EXISTE`)

    return callback(null, user)
}


module.exports = {
    getUserById,
}