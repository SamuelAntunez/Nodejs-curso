import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import { ServerApp } from "./server-app";
import { CreateTable, CreateTableOptions } from "../domain/use-cases/create-table.use-case";
import { SaveFile, SaveFileOptions } from "../domain/use-cases/save-file.use-case";

describe('ServerApp', () => {
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        name: 'table-2',
        destination: 'outputs'
    }
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should create serverApp instance', () => {

        const serverApp = new ServerApp()
        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run).toBe('function')

    });

    test('should run serverApp with options', () => {

        const logSpy = jest.spyOn(console, 'log')
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')

        ServerApp.run(options)
        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpy).toHaveBeenCalledWith('Server running...')
        expect(logSpy).toHaveBeenLastCalledWith('File created!')

        expect(createTableSpy).toHaveBeenCalledTimes(1)
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        })

        expect(saveFileSpy).toHaveBeenCalledTimes(1)
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileName: options.name,
            destination: options.destination
        })
    })

    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        // const content = '2 x 1 = 2'
        // const createMock = jest.fn().mockReturnValue(content) as ({ base, limit }: CreateTableOptions) => string;
        // const saveFileMock = jest.fn().mockReturnValue(true) as ({ fileContent, destination, fileName }: SaveFileOptions) => boolean;;

        const createMock = jest.fn().mockReturnValue('1 x 2 = 2') as ({ base, limit }: CreateTableOptions) => string;
        const saveFileMock = jest.fn().mockReturnValue(false) as ({ fileContent, destination, fileName }: SaveFileOptions) => boolean;

        global.console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options)

        expect(logMock).toHaveBeenCalledWith('Server running...')
        expect(logMock).toHaveBeenCalledWith('File not created!')
        expect(createMock).toHaveBeenCalledWith({ "base": options.base, "limit": options.limit })
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            destination: options.destination,
            fileName: options.name
        })
    })

})

