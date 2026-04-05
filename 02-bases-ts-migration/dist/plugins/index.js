"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLogger = exports.http = exports.getId = exports.getAge = void 0;
var get_age_plugin_1 = require("./get-age.plugin");
Object.defineProperty(exports, "getAge", { enumerable: true, get: function () { return get_age_plugin_1.getAge; } });
var get_id_plugin_1 = require("./get-id.plugin");
Object.defineProperty(exports, "getId", { enumerable: true, get: function () { return get_id_plugin_1.getId; } });
var http_client_plugin_1 = require("./http-client.plugin");
Object.defineProperty(exports, "http", { enumerable: true, get: function () { return http_client_plugin_1.httpClientPlugin; } });
var logger_plugin_1 = require("./logger.plugin");
Object.defineProperty(exports, "buildLogger", { enumerable: true, get: function () { return logger_plugin_1.buildLogger; } });
// const { http } = require('../plugins/http-client.plugin');
// const { getId } = require('../plugins/get-id.plugin');
// const { getAge } = require('../plugins/get-age.plugin');
// const buildLogger = require('./logger.plugin')
//# sourceMappingURL=index.js.map