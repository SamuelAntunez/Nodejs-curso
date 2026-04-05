import { findHeroByID } from "./services/hero.service"


const hero = findHeroByID(1)

console.log(hero?.name ?? 'Hero not found')