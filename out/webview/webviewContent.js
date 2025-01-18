"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContent = getWebviewContent;
function getWebviewContent(webview, extensionUri) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>LLM Code Generation</title>
        </head>
        <body>
          <div id="app">
            <h1>LLM Code Generation</h1>
            <textarea id="prompt" placeholder="Enter your code generation prompt..."></textarea>
            <button id="generate">Generate Code</button>
            <pre id="output"></pre>
          </div>
          <script>
            const vscode = acquireVsCodeApi();
            document.getElementById('generate').addEventListener('click', () => {
              const prompt = document.getElementById('prompt').value;
              vscode.postMessage({ command: 'generate', text: prompt });
            });

            window.addEventListener('message', event => {
              const message = event.data;
              if (message.command === 'generatedCode') {
                document.getElementById('output').textContent = message.text;
              }
            });
          </script>
        </body>
        </html>
      `;
}
//# sourceMappingURL=webviewContent.js.map