interface User {
    id: number;
    name: string;
}


const users: User[] = [
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



export function getUserById( id: number, callback: (err?: string, user?:User) => void ) {
    const user = users.find( user => user.id === id)
    
    if( !user ) return callback(`Usuario ${id} no existe`)

    return callback(undefined, user)
}


