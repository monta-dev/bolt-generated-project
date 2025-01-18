export function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri): string {
      const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'styles.css'));
      const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'main.js'));

      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="${styleUri}" rel="stylesheet">
          <title>LLM Code Generation</title>
        </head>
        <body>
          <div class="container">
            <h1>LLM Code Generation</h1>
            
            <div class="config-section">
              <h2>Configuration</h2>
              <div class="form-group">
                <label for="temperature">Temperature:</label>
                <input type="number" id="temperature" min="0" max="1" step="0.1" value="0.7">
              </div>
              <div class="form-group">
                <label for="maxTokens">Max Tokens:</label>
                <input type="number" id="maxTokens" min="1" max="4000" value="1000">
              </div>
              <button id="saveConfig">Save Configuration</button>
            </div>

            <div class="prompt-section">
              <h2>Code Generation</h2>
              <textarea id="prompt" placeholder="Enter your code generation prompt..."></textarea>
              <button id="generate">Generate Code</button>
              <button id="clearContext">Clear Context</button>
            </div>

            <div class="response-section">
              <h2>Generated Code</h2>
              <div class="loading" id="loading">Generating...</div>
              <pre id="response"></pre>
              <div class="error" id="error"></div>
            </div>
          </div>

          <script src="${scriptUri}"></script>
        </body>
        </html>
      `;
    }
