"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const io = __importStar(require("@actions/io"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const version = core.getInput('version', { required: true }) || '3.1.0';
            const dotnetPath = `${process.env['RUNNER_TEMP']}/dotnet`;
            yield io.mkdirP(dotnetPath); // Ensure the directory exists
            const downloadUrl = `https://download.visualstudio.microsoft.com/download/pr/76cabfc3-6010-472e-a5b3-bfe854a24c4e/1810de5554f8cd9825b47ae46b9990b4/dotnet-runtime-${version}-rhel.6-x64.tar.gz`;
            yield exec.exec('wget', [downloadUrl]);
            yield exec.exec('tar', ['-zxf', `dotnet-runtime-${version}-rhel.6-x64.tar.gz`, '-C', dotnetPath]);
            // Set the output variable
            core.setOutput('dotnet-path', dotnetPath);
            // Optionally, print out the version of dotnet
        }
        catch (error) {
            core.setFailed(`Action failed with error: ${error}`);
        }
    });
}
run();
