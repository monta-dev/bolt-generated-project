import * as vscode from 'vscode';
    import { LLMCodeGenerator } from './llm/llmCodeGenerator';
    import { LLMPanel } from './webview/llmPanel';

    export function activate(context: vscode.ExtensionContext) {
      const llmCodeGenerator = new LLMCodeGenerator();

      context.subscriptions.push(
        vscode.commands.registerCommand('llmCodegen.generate', async () => {
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
          } catch (error) {
            vscode.window.showErrorMessage(`Code generation failed: ${error}`);
          }
        })
      );

      context.subscriptions.push(
        vscode.commands.registerCommand('llmCodegen.openPanel', () => {
          LLMPanel.createOrShow(context.extensionUri);
        })
      );
    }

    export function deactivate() {}
