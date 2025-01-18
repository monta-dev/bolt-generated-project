import * as vscode from 'vscode';
    import { LLMManager } from '../llm/LLMManager';
    import { getWebviewContent } from './webviewContent';

    export class LLMPanel {
      public static currentPanel: LLMPanel | undefined;
      private readonly _panel: vscode.WebviewPanel;
      private _disposables: vscode.Disposable[] = [];
      private llmManager: LLMManager;

      private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, llmManager: LLMManager) {
        this._panel = panel;
        this.llmManager = llmManager;
        this._panel.webview.html = getWebviewContent(this._panel.webview, extensionUri);
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
          async message => {
            switch (message.command) {
              case 'generate':
                await this.handleGenerate(message.prompt);
                break;
              case 'configure':
                this.handleConfigure(message.config);
                break;
              case 'clearContext':
                this.handleClearContext();
                break;
            }
          },
          null,
          this._disposables
        );
      }

      public static createOrShow(extensionUri: vscode.Uri, llmManager: LLMManager) {
        if (LLMPanel.currentPanel) {
          LLMPanel.currentPanel._panel.reveal();
          return;
        }

        const panel = vscode.window.createWebviewPanel(
          'llmCodegen',
          'LLM Code Generation',
          vscode.ViewColumn.Beside,
          {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
          }
        );

        LLMPanel.currentPanel = new LLMPanel(panel, extensionUri, llmManager);
      }

      private async handleGenerate(prompt: string) {
        try {
          this._panel.webview.postMessage({ command: 'loading', isLoading: true });

          await this.llmManager.processPrompt(prompt, response => {
            this._panel.webview.postMessage({
              command: 'updateResponse',
              content: response.content,
              isComplete: response.isComplete
            });
          });

          this._panel.webview.postMessage({ command: 'loading', isLoading: false });
        } catch (error) {
          this._panel.webview.postMessage({
            command: 'error',
            message: error instanceof Error ? error.message : 'Generation failed'
          });
        }
      }

      private handleConfigure(config: any) {
        try {
          this.llmManager.updateConfig(config);
          this._panel.webview.postMessage({ command: 'configUpdated' });
        } catch (error) {
          this._panel.webview.postMessage({
            command: 'error',
            message: error instanceof Error ? error.message : 'Configuration failed'
          });
        }
      }

      private handleClearContext() {
        this.llmManager.clearContext();
        this._panel.webview.postMessage({ command: 'contextCleared' });
      }

      private dispose() {
        LLMPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
          const disposable = this._disposables.pop();
          if (disposable) {
            disposable.dispose();
          }
        }
      }
    }
