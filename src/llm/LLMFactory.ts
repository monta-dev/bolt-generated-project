import { LLMManager } from './LLMManager';

    /**
     * Factory class for creating LLM instances
     */
    export class LLMFactory {
      /**
       * Create a new LLM Manager instance
       * @param modelPath Path to the model
       * @returns Configured LLMManager instance
       */
      public static createLLMManager(modelPath: string): LLMManager {
        const defaultConfig = {
          modelPath,
          contextWindowSize: 10,
          temperature: 0.7,
          maxTokens: 1000
        };

        return new LLMManager(defaultConfig);
      }
    }
