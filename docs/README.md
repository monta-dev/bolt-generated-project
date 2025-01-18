# LLM Code Generator Extension

    ## Table of Contents
    1. [Overview](#overview)
    2. [Installation](#installation)
    3. [Usage](#usage)
    4. [Configuration](#configuration)
    5. [Development](#development)
    6. [Troubleshooting](#troubleshooting)
    7. [API Reference](#api-reference)

    ## Overview
    The LLM Code Generator is a VS Code extension that provides AI-powered code generation using local language models. It offers features like:
    - Context-aware code generation
    - Code explanation and refactoring
    - Customizable prompt templates
    - Integration with local LLMs

    ## Installation
    1. Open VS Code
    2. Go to the Extensions view (`Ctrl+Shift+X`)
    3. Search for "LLM Code Generator"
    4. Click Install

    ## Usage
    ### Generating Code
    1. Select the code you want to modify or generate
    2. Open the Command Palette (`Ctrl+Shift+P`)
    3. Select "Generate Code with LLM"
    4. Enter your prompt in the input box

    ### Using the Webview Panel
    1. Open the Command Palette (`Ctrl+Shift+P`)
    2. Select "Open LLM Code Generation Panel"
    3. Use the interface to generate and manage code

    ## Configuration
    ### Settings
    Open your VS Code settings and search for "LLM Code Generator" to configure:
    - Model settings
    - Performance options
    - User preferences

    Example settings:
    ```json
    "llmCodegen.model": {
      "path": "default-model",
      "temperature": 0.7,
      "maxTokens": 1000
    }
    ```

    ## Development
    ### Setup
    1. Clone the repository
    2. Install dependencies:
       ```bash
       npm install
       ```
    3. Run the extension in development mode:
       ```bash
       npm run watch
       ```

    ### Architecture
    The extension follows a modular architecture:
    ```
    src/
    ├── context/      # Context management
    ├── generation/   # Code generation logic
    ├── llm/          # LLM integration
    ├── webview/      # Webview components
    └── extension.ts  # Main entry point
    ```

    ## Troubleshooting
    ### Common Issues
    - **Extension not activating**: Check the VS Code developer tools console for errors
    - **Code generation failing**: Verify your model configuration and check the logs
    - **Performance issues**: Adjust the memory and timeout settings

    ### Logs
    View extension logs in the VS Code Output panel (`Ctrl+Shift+U`)

    ## API Reference
    ### Commands
    - `llmCodegen.generate`: Generate code from selection
    - `llmCodegen.openPanel`: Open the webview panel

    ### Configuration API
    ```typescript
    interface Config {
      model: {
        path: string;
        temperature: number;
        maxTokens: number;
      };
      // ...
    }
    ```

    ### Context API
    ```typescript
    class ContextManager {
      getRelevantContext(filePath: string): string;
      updateContext(filePath: string, content: string): void;
      clearContext(): void;
    }
    ```
