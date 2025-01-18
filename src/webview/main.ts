import * as vscode from 'vscode';
    import { LLMPanel } from './LLMPanel';
    import { LLMFactory } from '../llm/LLMFactory';

    export function activate(context: vscode.ExtensionContext) {
      const llmManager = LLMFactory.createLLMManager('default-model-path');

      context.subscriptions.push(
        vscode.commands.registerCommand('llmCodegen.openPanel', () => {
          LLMPanel.createOrShow(context.extensionUri, llmManager);
        })
      );

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
            const generatedCode = await llmManager.processPrompt(selectedText);
            editor.edit(editBuilder => {
              editBuilder.replace(editor.selection, generatedCode.content);
            });
          } catch (error) {
            vscode.window.showErrorMessage(`Code generation failed: ${error}`);
          }
        })
      );
    }

    export function deactivate() {}
