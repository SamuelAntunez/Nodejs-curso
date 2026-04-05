import { describe, expect, test, jest } from '@jest/globals';

import { getId } from "../../src/plugins/get-id.plugin";

describe('plugins/get-id.plugins.ts', ()=>{
    test('getId() should return an uuid', ( )=>{
        const id = getId()

        expect(typeof id).toBe('string')
        expect(id.length).toBe(36)
    })
})