"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heroes = [
    {
        id: 1,
        name: 'Spiderman',
        owner: 'Marvel'
    },
    {
        id: 2,
        name: 'Iron Man',
        owner: 'Marvel'
    },
    {
        id: 3,
        name: 'Batman',
        owner: 'DC'
    }
];
const findHeroByID = (id) => {
    return heroes.find((hero) => hero.id === id);
};
const hero = findHeroByID(1);
console.log(hero?.name ?? 'Hero not found');
//# sourceMappingURL=app.js.map