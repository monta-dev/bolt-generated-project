/**
     * Class for formatting generated code
     */
    export class CodeFormatter {
      /**
       * Format generated code
       * @param code Raw generated code
       * @param language Target language
       */
      public formatCode(code: string, language: string): string {
        // Remove markdown code blocks if present
        code = code.replace(/```[\s\S]*?\n([\s\S]*?)```/g, '$1');

        // Language-specific formatting
        switch (language.toLowerCase()) {
          case 'javascript':
          case 'typescript':
            return this.formatJavaScript(code);
          case 'python':
            return this.formatPython(code);
          case 'java':
            return this.formatJava(code);
          case 'cpp':
            return this.formatCpp(code);
          default:
            return code.trim();
        }
      }

      private formatJavaScript(code: string): string {
        return code
          .replace(/;\s*}/g, '}')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }

      private formatPython(code: string): string {
        return code
          .replace(/\s{2,}/g, ' ')
          .replace(/\n{3,}/g, '\n\n')
          .trim();
      }

      private formatJava(code: string): string {
        return code
          .replace(/;\s*}/g, '}')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }

      private formatCpp(code: string): string {
        return code
          .replace(/;\s*}/g, '}')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }
    }
