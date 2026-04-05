
import { describe, expect, jest, test, beforeEach } from '@jest/globals';
// import { beforeEach } from 'node:test';


const runCommand = async (args: string[]) => {
    // permite enviar los argumentos para agregarlos al process.argv
    process.argv = [...process.argv, ...args]

    const { yarg } = await import('./args.plugin')

    return yarg
}

describe('argsPlugin', () => {

    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return an array of arguments', async () => {

        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }))

    });

    test('should return configuration with custom values', async () => {
        const argv = await runCommand(['-b', '4', '-l', '5', '-s', 'true', '-n', 'test', '-d', 'test'])
        console.log(process.argv)
        expect(argv).toEqual(expect.objectContaining({
            b: 4,
            l: 5,
            s: true,
            n: 'test',
            d: 'test',
        }))
    })

})