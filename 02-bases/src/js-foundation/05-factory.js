// const {getAge, getId} = require('../plugins')

const makeBuildPerson = ({getAge, getId}) =>{
    return ({name, birthdate}) =>{
        return {
            id: getId(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        }
}}




module.exports = {
    makeBuildPerson,
}