import { describe, expect, test } from '@jest/globals';

import { characters } from '../../src/js-foundation/02-destructuring'

describe('js-foundation/02-destructuring.ts', () => {

    test('characters should contain flash', () => {

        expect(characters).toContain('flash')

    });

    test('first character should be Flash, and second Superman', () => {
        const [flash, batman] = characters;

        expect(flash).toBe('flash');
        expect(batman).toBe('batman')
    })
})