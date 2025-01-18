/**
     * Class for managing prompt templates
     */
    export class PromptTemplateManager {
      private templates: Record<string, string> = {
        default: `Context:\n{context}\n\nGenerate {language} code for: {input}`,
        explain: `Context:\n{context}\n\nExplain this {language} code: {input}`,
        refactor: `Context:\n{context}\n\nRefactor this {language} code: {input}`
      };

      /**
       * Create a prompt from template
       * @param input User input
       * @param language Target language
       * @param context Relevant context
       * @param templateName Template name
       */
      public createPrompt(
        input: string,
        language: string,
        context: string,
        templateName: string = 'default'
      ): string {
        const template = this.templates[templateName] || this.templates.default;
        return template
          .replace('{input}', input)
          .replace('{language}', language)
          .replace('{context}', context);
      }

      /**
       * Add or update a template
       * @param name Template name
       * @param content Template content
       */
      public setTemplate(name: string, content: string): void {
        this.templates[name] = content;
      }
    }
