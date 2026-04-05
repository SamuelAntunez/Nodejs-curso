interface makeBuildPersonOption {
    getAge: (birthdate: string) => number;
    getId: () => string;
}
interface personOptions {
    name: string;
    birthdate: string;
}
export declare const makeBuildPerson: ({ getAge, getId }: makeBuildPersonOption) => ({ name, birthdate }: personOptions) => {
    id: string;
    name: string;
    birthdate: string;
    age: number;
};
export {};
//# sourceMappingURL=05-factory.d.ts.map