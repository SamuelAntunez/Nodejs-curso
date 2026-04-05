const { http } = require('../plugins/index')

const getPokemonById = async( id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await http.get(url)
    return pokemon.name
}


module.exports = getPokemonById;



// !Async - await
// const resp = await fetch(url);
    // const pokemon = await resp.json();

    // throw new Error('Pokemon no existe')

// !Promesa
    // return fetch(url)
    //         .then( (res ) => res.json())
    //         .then( (pokemon) => pokemon.name)



// !con callback
    // fetch(url)
    //     .then( (response)=>{
    //         return response.json();
    // })
    // .then( ( pokemon ) =>{
    //     callback(pokemon.name)
    // })