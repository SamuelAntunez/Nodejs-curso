import { describe, expect, test, jest } from '@jest/globals';

import { httpClientPlugin as http } from "../../src/plugins/http-client.plugin";

describe('plugins/http-client.plugin.ts', () => {


    test('http should return a json', async () => {
        const data = await http.get('https://jsonplaceholder.typicode.com/todos/1')

        expect(data).toEqual({
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": expect.any(Boolean)
        })
    })
    test('httpClientPlugin should have POST, PUT and DELETE metohods', () => {

        expect(typeof http.post).toBe('function')
        expect(typeof http.put).toBe('function')
        expect(typeof http.delete).toBe('function')
    })



})