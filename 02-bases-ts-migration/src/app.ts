// const {getAge, getId, buildLogger } = require('./plugins')
// const {makeBuildPerson} = require('./js-foundation/05-factory')
// const getPokemonById = require('./js-foundation/06-promises')










// !Logger

// import { buildLogger } from "./plugins/logger.plugin";
// const logger = buildLogger('app.js');
// logger.log('Hola Mundo')
// logger.error('Esto es algo malo')
// console.log('Hola Mundo')



// !Promesa Async/await - Axios

// getPokemonById(4)
//     .then((pokemon) => console.log(pokemon))
//     .catch( (err) => console.log(`${err}, Porfavor intente de nuevo`))


// !Referencia Desestructuracion
// require('./js-foundation/02-destructuring')
// const {getUserById} = require('./js-foundation/03-callbacks')
// getUserById(3, (err, user) =>{
//     if (err) return throw new Error(err)
    
//     console.log({user})
// })
// const id = 1

// !Referencia CallBacks
// const {getUserById} = require('./js-foundation/03-callbacks')

// getUserById(id, function(err, user){
//     if (err) {
//         throw new Error('User not found')
//     }
//     console.log(user)
// })

// !Referencia factory Function
// const obj = { name: 'John', birthdate: '06-05-2001'}

// const makePerson = makeBuildPerson({getId, getAge})
// const john = makePerson(obj)

// console.log(john)