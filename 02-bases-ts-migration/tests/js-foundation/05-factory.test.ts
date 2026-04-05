import { describe, expect, test } from '@jest/globals';
import { makeBuildPerson } from "../../src/js-foundation/05-factory";

describe('', () => {
    const getId = () => '1234';
    const getAge = () => 35;

    test('buildMakePersona should return a function', () => {

        const makePerson = makeBuildPerson({ getAge, getId })
        expect(typeof makePerson).toBe('function')
    });

    test('makePerson should return a person', () => {
        const makePerson = makeBuildPerson({ getAge, getId })
        const johnDoe = makePerson({ name: 'John Doe', birthdate: '1985-10-21' })

        expect(johnDoe).toEqual({ id: '1234', name: 'John Doe', birthdate: '1985-10-21', age: 35 })
        console.log(johnDoe)
    });
})