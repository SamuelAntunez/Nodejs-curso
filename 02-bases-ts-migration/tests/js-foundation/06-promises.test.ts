import { describe, expect, test } from '@jest/globals';
import { getPokemonById } from "../../src/js-foundation/06-promises";


describe('js-foundation/06-promises.ts', () =>{

    test('getPokemonById should return a pokemon', async() =>{

        const pokemonId = 1;
        const pokemon = await getPokemonById(pokemonId)

        expect( pokemon).toBe('bulbasaur')

    }); 

    test('should return an error if pokemon does not exist', async() =>{

        const pokemonId = 10000000;
        

        try {
            const pokemon = await getPokemonById(pokemonId)
            expect(true).toBeFalsy();
        } catch (error) {
            expect( error).toBe('Pokemon no existe')

        }
    })


})