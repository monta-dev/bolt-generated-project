import * as vscode from 'vscode';
    import * as path from 'path';
    import { LanguageContextExtractor } from './LanguageContextExtractor';

    /**
     * Interface for context item
     */
    interface ContextItem {
      filePath: string;
      content: string;
      language: string;
      relevanceScore: number;
    }

    /**
     * Main context manager class
     */
    export class ContextManager {
      private contextItems: ContextItem[] = [];
      private maxContextSize: number;
      private extractor: LanguageContextExtractor;

      constructor(maxContextSize: number = 10000) {
        this.maxContextSize = maxContextSize;
        this.extractor = new LanguageContextExtractor();
      }

      /**
       * Analyze workspace and build initial context
       */
      public async analyzeWorkspace(): Promise<void> {
        try {
          const workspaceFolders = vscode.workspace.workspaceFolders;
          if (!workspaceFolders) {
            throw new Error('No workspace folder found');
          }

          for (const folder of workspaceFolders) {
            await this.processWorkspaceFolder(folder.uri.fsPath);
          }

          this.prioritizeContext();
        } catch (error) {
          this.handleError('Workspace analysis failed', error);
        }
      }

      /**
       * Get relevant context for a given file
       * @param filePath Path to the file
       */
      public getRelevantContext(filePath: string): string {
        const fileContext = this.contextItems
          .filter(item => this.isRelated(filePath, item.filePath))
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .slice(0, 5)
          .map(item => `File: ${item.filePath}\n${item.content}`)
          .join('\n\n');

        return fileContext || 'No relevant context found';
      }

      /**
       * Update context with new information
       * @param filePath Path to the file
       * @param content File content
       */
      public updateContext(filePath: string, content: string): void {
        const existingItem = this.contextItems.find(item => item.filePath === filePath);
        const language = path.extname(filePath).slice(1);

        if (existingItem) {
          existingItem.content = content;
          existingItem.relevanceScore = this.calculateRelevanceScore(filePath);
        } else {
          this.contextItems.push({
            filePath,
            content: this.extractor.extractRelevantContent(content, language),
            language,
            relevanceScore: this.calculateRelevanceScore(filePath)
          });

          this.manageContextSize();
        }
      }

      /**
       * Clear all context
       */
      public clearContext(): void {
        this.contextItems = [];
      }

      /**
       * Process a workspace folder
       * @param folderPath Path to the folder
       */
      private async processWorkspaceFolder(folderPath: string): Promise<void> {
        const files = await vscode.workspace.findFiles(
          new vscode.RelativePattern(folderPath, '**/*.{js,ts,py,java,cpp}'),
          '**/node_modules/**'
        );

        for (const file of files) {
          try {
            const document = await vscode.workspace.openTextDocument(file);
            this.updateContext(file.fsPath, document.getText());
          } catch (error) {
            this.handleError(`Failed to process file: ${file.fsPath}`, error);
          }
        }
      }

      /**
       * Manage context size to prevent memory issues
       */
      private manageContextSize(): void {
        if (this.contextItems.length > this.maxContextSize) {
          this.contextItems.sort((a, b) => b.relevanceScore - a.relevanceScore);
          this.contextItems = this.contextItems.slice(0, this.maxContextSize);
        }
      }

      /**
       * Prioritize context items based on relevance
       */
      private prioritizeContext(): void {
        this.contextItems.forEach(item => {
          item.relevanceScore = this.calculateRelevanceScore(item.filePath);
        });
      }

      /**
       * Calculate relevance score for a file
       * @param filePath Path to the file
       */
      private calculateRelevanceScore(filePath: string): number {
        const isMainFile = path.basename(filePath).toLowerCase().includes('main');
        const isTestFile = filePath.includes('test') || filePath.includes('spec');
        const depth = filePath.split(path.sep).length;

        let score = 100;
        if (isMainFile) score += 50;
        if (isTestFile) score -= 30;
        score -= depth * 5;

        return Math.max(0, score);
      }

      /**
       * Check if two files are related
       * @param filePath1 First file path
       * @param filePath2 Second file path
       */
      private isRelated(filePath1: string, filePath2: string): boolean {
        const dir1 = path.dirname(filePath1);
        const dir2 = path.dirname(filePath2);
        return dir1 === dir2 || dir1.startsWith(dir2) || dir2.startsWith(dir1);
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
