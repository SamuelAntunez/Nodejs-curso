import { describe, expect, test, jest } from '@jest/globals';
import { getAge } from "../../src/plugins/get-age.plugin";

describe('plugins/get-age.plugin.ts', () => {
    test('getAge() should return the age of a person', () => {

        const birthdate = '2001-05-06';
        const age = getAge(birthdate);
        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();

        expect(typeof age).toBe('number');
        expect(age).toBe(calculatedAge)

    })
    test('getAge should return 0 years', () => {
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);

        const birthdate = '1995-10-21';
        const age = getAge(birthdate);

        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled();
    })

})