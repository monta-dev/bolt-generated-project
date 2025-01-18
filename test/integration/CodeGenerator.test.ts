import { CodeGenerator } from '../../src/generation/CodeGenerator';
    import { ContextManager } from '../../src/context/ContextManager';
    import { LLMManager } from '../../src/llm/LLMManager';

    describe('CodeGenerator Integration', () => {
      let codeGenerator: CodeGenerator;
      let contextManager: ContextManager;
      let llmManager: LLMManager;

      beforeEach(() => {
        contextManager = new ContextManager();
        llmManager = new LLMManager({
          modelPath: 'test-model',
          contextWindowSize: 1000,
          temperature: 0.7,
          maxTokens: 1000
        });
        codeGenerator = new CodeGenerator(contextManager, llmManager);
      });

      it('should generate and format code correctly', async () => {
        const input = 'Create a function that adds two numbers';
        const language = 'typescript';
        const code = await codeGenerator.generateCode(input, language);
        expect(code).toContain('function');
        expect(code).toContain('add');
      });

      // Add more tests...
    });
