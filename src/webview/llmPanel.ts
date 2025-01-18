import * as vscode from 'vscode';
    import { getWebviewContent } from './webviewContent';

    export class LLMPanel {
      public static currentPanel: LLMPanel | undefined;
      private readonly _panel: vscode.WebviewPanel;
      private _disposables: vscode.Disposable[] = [];

      private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._panel.webview.html = getWebviewContent(this._panel.webview, extensionUri);
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
          message => {
            switch (message.command) {
              case 'generate':
                vscode.commands.executeCommand('llmCodegen.generate', message.text);
                return;
            }
          },
          null,
          this._disposables
        );
      }

      public static createOrShow(extensionUri: vscode.Uri) {
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
            retainContextWhenHidden: true
          }
        );

        LLMPanel.currentPanel = new LLMPanel(panel, extensionUri);
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
