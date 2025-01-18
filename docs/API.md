# API Reference

    ## Core Modules
    ### ContextManager
    ```typescript
    class ContextManager {
      analyzeWorkspace(): Promise<void>;
      getRelevantContext(filePath: string): string;
      updateContext(filePath: string, content: string): void;
      clearContext(): void;
    }
    ```

    ### LLMManager
    ```typescript
    class LLMManager {
      constructor(config: LLMConfig);
      initialize(): Promise<void>;
      processPrompt(prompt: string): Promise<LLMResponse>;
    }
    ```

    ### CodeGenerator
    ```typescript
    class CodeGenerator {
      constructor(contextManager: ContextManager, llmManager: LLMManager);
      generateCode(input: string, language: string): Promise<string>;
      insertCode(code: string): void;
    }
    ```

    ## Configuration
    ### ConfigManager
    ```typescript
    class ConfigManager {
      getConfig(): ConfigType;
      updateConfig(newConfig: Partial<ConfigType>): void;
      resetToDefaults(): void;
    }
    ```

    ## Webview
    ### LLMPanel
    ```typescript
    class LLMPanel {
      static createOrShow(extensionUri: vscode.Uri, llmManager: LLMManager): void;
    }
    ```
