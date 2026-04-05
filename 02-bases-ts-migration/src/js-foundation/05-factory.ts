// const {getAge, getId} = require('../plugins')

interface makeBuildPersonOption {
    getAge: (birthdate: string) => number;
    getId: () => string;
}

interface personOptions {
    name: string;
    birthdate: string;
}

export const makeBuildPerson = ({ getAge, getId }: makeBuildPersonOption) => {
    return ({ name, birthdate }: personOptions) => {
        return {
            id: getId(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        }
    }
}



