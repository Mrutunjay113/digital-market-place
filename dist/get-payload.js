"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadClient = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var payload_config_next_1 = __importDefault(require("./payload.config.next"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
var transporter = nodemailer_1.default.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    debug: true,
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
    },
});
var cached = global.payloadClient;
if (!cached) {
    cached = global.payloadClient = {
        client: null,
        promise: null,
    };
}
var resolveConfig = function (config) {
    var _a;
    var resolved = (_a = config === null || config === void 0 ? void 0 : config.default) !== null && _a !== void 0 ? _a : config;
    return resolved;
};
var getPayloadClient = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (_a) {
        var _b, _c, payload, getPayload, payloadConfig, options, _d, error_1;
        var _e = _a === void 0 ? {} : _a, initOptions = _e.initOptions;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!process.env.PAYLOAD_SECRET) {
                        throw new Error("PAYLOAD_SECRET_KEY is not set");
                    }
                    if (cached.client) {
                        return [2 /*return*/, cached.client];
                    }
                    if (!process.env.PAYLOAD_CONFIG_PATH) {
                        process.env.PAYLOAD_CONFIG_PATH = path_1.default.resolve(process.cwd(), "dist/payload.config.js");
                    }
                    if (!!cached.promise) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all([
                            Promise.resolve().then(function () { return __importStar(require("payload")); }),
                            (initOptions === null || initOptions === void 0 ? void 0 : initOptions.express)
                                ? Promise.resolve("".concat(
                                /* webpackIgnore: true */
                                path_1.default.join(__dirname, "payload.config"))).then(function (s) { return __importStar(require(s)); }).then(resolveConfig)
                                : Promise.resolve(resolveConfig(payload_config_next_1.default)),
                        ])];
                case 1:
                    _b = _f.sent(), _c = _b[0], payload = _c.default, getPayload = _c.getPayload, payloadConfig = _b[1];
                    options = __assign({ config: Promise.resolve(payloadConfig), email: {
                            transport: transporter,
                            fromName: "DigitalHippo",
                            fromAddress: "john@hippomarketplace.shop",
                        }, secret: process.env.PAYLOAD_SECRET, local: (initOptions === null || initOptions === void 0 ? void 0 : initOptions.express) ? false : true }, (initOptions || {}));
                    cached.promise = (initOptions === null || initOptions === void 0 ? void 0 : initOptions.express)
                        ? payload.init(options)
                        : getPayload(options);
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 4, , 5]);
                    _d = cached;
                    return [4 /*yield*/, cached.promise];
                case 3:
                    _d.client = _f.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _f.sent();
                    cached.promise = null;
                    console.error("Error initializing Payload client", error_1);
                    throw error_1;
                case 5: return [2 /*return*/, cached.client];
            }
        });
    });
};
exports.getPayloadClient = getPayloadClient;
