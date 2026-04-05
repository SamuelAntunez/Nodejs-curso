export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {

    constructor() {

    }

    execute({ base, limit = 10 }: CreateTableOptions) {

        let outputhMessage = ''
        for (let i = 1; i <= limit; i++) {
            outputhMessage += ` ${base} x ${i} = ${base * i}`

            if (i < limit) outputhMessage += `\n`

        }

        return outputhMessage
    }

}

