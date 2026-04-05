const { http } = require('../plugins/index')

export const getPokemonById = async (id: string | number): Promise<string> => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const pokemon = await http.get(url)
        return pokemon.name
    } catch (error) {
        throw ('Pokemon no existe')
    }
}





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