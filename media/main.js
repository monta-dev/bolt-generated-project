(function() {
      const vscode = acquireVsCodeApi();

      // UI Elements
      const promptInput = document.getElementById('prompt');
      const generateButton = document.getElementById('generate');
      const responseElement = document.getElementById('response');
      const loadingElement = document.getElementById('loading');
      const errorElement = document.getElementById('error');
      const temperatureInput = document.getElementById('temperature');
      const maxTokensInput = document.getElementById('maxTokens');
      const saveConfigButton = document.getElementById('saveConfig');
      const clearContextButton = document.getElementById('clearContext');

      // Handle generate button click
      generateButton.addEventListener('click', () => {
        const prompt = promptInput.value.trim();
        if (prompt) {
          vscode.postMessage({
            command: 'generate',
            prompt: prompt
          });
        }
      });

      // Handle configuration save
      saveConfigButton.addEventListener('click', () => {
        const config = {
          temperature: parseFloat(temperatureInput.value),
          maxTokens: parseInt(maxTokensInput.value)
        };
        vscode.postMessage({
          command: 'configure',
          config: config
        });
      });

      // Handle clear context
      clearContextButton.addEventListener('click', () => {
        vscode.postMessage({
          command: 'clearContext'
        });
      });

      // Handle messages from extension
      window.addEventListener('message', event => {
        const message = event.data;

        switch (message.command) {
          case 'updateResponse':
            responseElement.textContent = message.content;
            if (message.isComplete) {
              loadingElement.style.display = 'none';
            }
            break;

          case 'loading':
            loadingElement.style.display = message.isLoading ? 'block' : 'none';
            break;

          case 'error':
            errorElement.textContent = message.message;
            errorElement.style.display = 'block';
            setTimeout(() => {
              errorElement.style.display = 'none';
            }, 5000);
            break;

          case 'configUpdated':
            vscode.postMessage({
              command: 'showInfo',
              message: 'Configuration updated successfully'
            });
            break;

          case 'contextCleared':
            vscode.postMessage({
              command: 'showInfo',
              message: 'Context cleared successfully'
            });
            break;
        }
      });
    })();
