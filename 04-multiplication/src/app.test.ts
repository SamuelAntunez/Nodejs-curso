import { describe, expect, test, jest } from '@jest/globals';
import { ServerApp } from './presentation/server-app';

describe('App.ts', () => {

    test('should call Server.run with values', async () => {

        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '2', '-l', '10', '-s', 'false', '-n', 'table-2', '-d', 'outputs'];

        await import('./app')

        expect(serverRunMock).toHaveBeenCalledTimes(1)
        expect(serverRunMock).toHaveBeenCalledWith({
            base: 2,
            limit: 10,
            showTable: false,
            name: 'table-2',
            destination: 'outputs'
        })

    })


})