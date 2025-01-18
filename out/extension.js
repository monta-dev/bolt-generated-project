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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const llmCodeGenerator_1 = require("./llm/llmCodeGenerator");
const llmPanel_1 = require("./webview/llmPanel");
function activate(context) {
    const llmCodeGenerator = new llmCodeGenerator_1.LLMCodeGenerator();
    context.subscriptions.push(vscode.commands.registerCommand('llmCodegen.generate', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }
        const selectedText = editor.document.getText(editor.selection);
        if (!selectedText) {
            vscode.window.showErrorMessage('No text selected');
            return;
        }
        try {
            const generatedCode = await llmCodeGenerator.generateCode(selectedText);
            editor.edit(editBuilder => {
                editBuilder.replace(editor.selection, generatedCode);
            });
        }
        catch (error) {
            vscode.window.showErrorMessage(`Code generation failed: ${error}`);
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('llmCodegen.openPanel', () => {
        llmPanel_1.LLMPanel.createOrShow(context.extensionUri);
    }));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map