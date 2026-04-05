"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characters = void 0;
const { SHELL, TEMP, SystemRoot } = process.env;
console.table({ SHELL, TEMP, SystemRoot });
exports.characters = ['flash', 'batman'];
const [_, batman] = exports.characters;
console.log(_, batman);
//# sourceMappingURL=02-destructuring.js.map