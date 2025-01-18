# Development Guide

    ## Getting Started
    1. Clone the repository
    2. Install dependencies:
       ```bash
       npm install
       ```
    3. Run the extension in development mode:
       ```bash
       npm run watch
       ```

    ## Architecture Overview
    The extension follows a modular architecture with clear separation of concerns:
    - **Context Management**: Handles code context and workspace analysis
    - **LLM Integration**: Manages interactions with local language models
    - **Code Generation**: Implements the core generation logic
    - **Webview Components**: Provides the user interface

    ## Testing
    Run the test suite:
    ```bash
    npm test
    ```

    ### Test Types
    - **Unit Tests**: Test individual components
    - **Integration Tests**: Test component interactions
    - **End-to-End Tests**: Test the extension as a whole

    ## Code Style
    - Follow TypeScript best practices
    - Use ESLint for linting
    - Maintain consistent formatting with Prettier

    ## Contributing
    1. Fork the repository
    2. Create a feature branch
    3. Submit a pull request
