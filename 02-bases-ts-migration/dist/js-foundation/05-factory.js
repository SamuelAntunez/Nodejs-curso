"use strict";
// const {getAge, getId} = require('../plugins')
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeBuildPerson = void 0;
const makeBuildPerson = ({ getAge, getId }) => {
    return ({ name, birthdate }) => {
        return {
            id: getId(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        };
    };
};
exports.makeBuildPerson = makeBuildPerson;
//# sourceMappingURL=05-factory.js.map