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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMCodeGenerator = void 0;
const vscode = __importStar(require("vscode"));
class LLMCodeGenerator {
    constructor() {
        this.llmAdapter = new LocalLLMAdapter();
    }
    async generateCode(prompt) {
        const context = this.getContext();
        const fullPrompt = `${context}\n\n${prompt}`;
        return this.llmAdapter.generate(fullPrompt);
    }
    getContext() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return '';
        }
        const document = editor.document;
        const languageId = document.languageId;
        const filePath = document.uri.fsPath;
        const surroundingCode = this.getSurroundingCode(editor);
        return `Language: ${languageId}\nFile: ${filePath}\nContext:\n${surroundingCode}`;
    }
    getSurroundingCode(editor) {
        const document = editor.document;
        const selection = editor.selection;
        const startLine = Math.max(0, selection.start.line - 5);
        const endLine = Math.min(document.lineCount - 1, selection.end.line + 5);
        let code = '';
        for (let i = startLine; i <= endLine; i++) {
            code += document.lineAt(i).text + '\n';
        }
        return code;
    }
}
exports.LLMCodeGenerator = LLMCodeGenerator;
//# sourceMappingURL=llmCodeGenerator.js.map