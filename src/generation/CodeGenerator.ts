import * as vscode from 'vscode';
    import { ContextManager } from '../context/ContextManager';
    import { LLMManager } from '../llm/LLMManager';
    import { CodeFormatter } from './CodeFormatter';
    import { PromptTemplateManager } from './PromptTemplateManager';

    /**
     * Main code generator class
     */
    export class CodeGenerator {
      private contextManager: ContextManager;
      private llmManager: LLMManager;
      private formatter: CodeFormatter;
      private templateManager: PromptTemplateManager;

      constructor(contextManager: ContextManager, llmManager: LLMManager) {
        this.contextManager = contextManager;
        this.llmManager = llmManager;
        this.formatter = new CodeFormatter();
        this.templateManager = new PromptTemplateManager();
      }

      /**
       * Generate code based on user input
       * @param input User input
       * @param language Target language
       */
      public async generateCode(input: string, language: string): Promise<string> {
        try {
          // Get relevant context
          const context = this.getCurrentContext();
          
          // Prepare prompt
          const prompt = this.templateManager.createPrompt(input, language, context);
          
          // Generate code
          const rawCode = await this.llmManager.processPrompt(prompt);
          
          // Validate and format code
          const formattedCode = this.formatter.formatCode(rawCode.content, language);
          
          return formattedCode;
        } catch (error) {
          this.handleError('Code generation failed', error);
          throw error;
        }
      }

      /**
       * Insert generated code into active editor
       * @param code Generated code
       */
      public insertCode(code: string): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          throw new Error('No active editor found');
        }

        editor.edit(editBuilder => {
          if (editor.selection.isEmpty) {
            // Insert at cursor position
            editBuilder.insert(editor.selection.active, code);
          } else {
            // Replace selection
            editBuilder.replace(editor.selection, code);
          }
        });
      }

      /**
       * Get current context for code generation
       */
      private getCurrentContext(): string {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return '';
        }

        const filePath = editor.document.uri.fsPath;
        return this.contextManager.getRelevantContext(filePath);
      }

      /**
       * Handle errors
       * @param message Error message
       * @param error The error object
       */
      private handleError(message: string, error: unknown): void {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        vscode.window.showErrorMessage(`${message}: ${errorMessage}`);
        console.error(`${message}:`, error);
      }
    }
