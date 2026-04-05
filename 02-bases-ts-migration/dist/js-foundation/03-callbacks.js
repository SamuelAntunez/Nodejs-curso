"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = getUserById;
const users = [
    {
        id: 1,
        name: 'John Doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    }
];
// const getUserById = function(id) {
//     const user = users.find( user => user.id === id)
//     console.log({user})
// }   
function getUserById(id, callback) {
    const user = users.find(user => user.id === id);
    if (!user)
        return callback(`Usuario ${id} no existe`);
    return callback(undefined, user);
}
//# sourceMappingURL=03-callbacks.js.map