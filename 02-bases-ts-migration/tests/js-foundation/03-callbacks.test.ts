import { getUserById } from '../../src/js-foundation/03-callbacks'
import { describe, expect, test } from '@jest/globals';

describe('js-foundation/03-callbacks.ts', () => {
    test('getUserById should return an error if user does not exist', () => {
        const id = 10;

        getUserById(id, (err, user) => {

            expect(err).toBe(`Usuario ${id} no existe`)
            expect(user).toBeUndefined()


        })
    })

    test('getIserByid should return user', () => {
        const id = 1

        getUserById(id, (err, user) => {

            expect(err).toBeUndefined()
            expect(user).toStrictEqual({
                id: 1,
                name: 'John Doe'
            })

        })
    })
})