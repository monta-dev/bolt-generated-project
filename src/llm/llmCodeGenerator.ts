import * as vscode from 'vscode';

    export class LLMCodeGenerator {
      private llmAdapter: LLMAdapter;

      constructor() {
        this.llmAdapter = new LocalLLMAdapter();
      }

      public async generateCode(prompt: string): Promise<string> {
        const context = this.getContext();
        const fullPrompt = `${context}\n\n${prompt}`;
        return this.llmAdapter.generate(fullPrompt);
      }

      private getContext(): string {
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

      private getSurroundingCode(editor: vscode.TextEditor): string {
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
