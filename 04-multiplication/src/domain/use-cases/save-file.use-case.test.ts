import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import { SaveFile } from "./save-file.use-case";
import fs from 'fs-extra';


describe('SaveFileUseCase', () => {
    const options = {
        fileContent: 'custom content',
        destination: 'custom-outputs/file-destination',
        fileName: 'custom-name'
    }
    // Limpiar ANTES de cada test (más confiable que afterEach)
    afterEach(() => {
        const outputsExists = fs.existsSync('outputs')
        const customOutputsExists = fs.existsSync('custom-outputs');

        if (outputsExists) fs.rmSync('outputs', { recursive: true })
        if (customOutputsExists) fs.rmSync('custom-outputs', { recursive: true })
    })

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'hola soy Samuel'
        }

        const file = saveFile.execute(options)
        const checkFile = fs.existsSync(filePath)
        const readFile = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect(file).toBe(true)
        expect(checkFile).toBe(true)
        expect(readFile).toBe(options.fileContent)
    })

    test('should save file with custom values', () => {

        // Arrange
        const filePath = `${options.destination}/${options.fileName}.txt`
        const saveFile = new SaveFile();

        // Act
        const file = saveFile.execute(options)
        const readFile = fs.readFileSync(filePath, { encoding: 'utf-8' })
        const fileName = fs.readdirSync(options.destination)
        const checkPath = fs.existsSync(options.destination);


        // Assert
        expect(readFile).toContain('custom content')
        expect(fileName[0]).toBe(`${options.fileName}.txt`)
        expect(checkPath).toBe(true)
    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('error') }
        )
        const result = saveFile.execute(options)

        expect(result).toBe(false)
    })

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            (file, data, options) => { throw new Error('error') }
        )
        const result = saveFile.execute(options)

        expect(result).toBe(false)



    })
})