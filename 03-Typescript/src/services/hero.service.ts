import { heroes } from "../data/heroes";

export const findHeroByID = ( id: number ) =>{
    return heroes.find( (hero) => hero.id === id);
}