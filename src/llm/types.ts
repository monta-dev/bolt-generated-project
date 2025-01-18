/**
     * Interface for LLM configuration
     */
    export interface LLMConfig {
      modelPath: string;
      contextWindowSize: number;
      temperature: number;
      maxTokens: number;
    }

    /**
     * Interface for LLM response
     */
    export interface LLMResponse {
      content: string;
      isComplete: boolean;
      error?: string;
    }
