# Testing Documentation

    ## Test Structure

    - **Unit Tests**: Test individual components in isolation
    - **Integration Tests**: Test interactions between components
    - **End-to-End Tests**: Test the extension as a whole

    ## Running Tests

    ```bash
    npm test
    ```

    ## Coverage

    To generate coverage reports:

    ```bash
    npm run test:coverage
    ```

    ## Mocking

    Use the mock implementations in `test/mocks` to simulate VS Code API behavior.
