/**
     * Class for extracting relevant content based on language
     */
    export class LanguageContextExtractor {
      /**
       * Extract relevant content from file content
       * @param content File content
       * @param language File language
       */
      public extractRelevantContent(content: string, language: string): string {
        switch (language) {
          case 'js':
          case 'ts':
            return this.extractJavaScriptContext(content);
          case 'py':
            return this.extractPythonContext(content);
          case 'java':
            return this.extractJavaContext(content);
          case 'cpp':
            return this.extractCppContext(content);
          default:
            return content;
        }
      }

      private extractJavaScriptContext(content: string): string {
        return this.extractFunctionsAndClasses(content, /(?:function|class)\s+(\w+)/g);
      }

      private extractPythonContext(content: string): string {
        return this.extractFunctionsAndClasses(content, /(?:def|class)\s+(\w+)/g);
      }

      private extractJavaContext(content: string): string {
        return this.extractFunctionsAndClasses(content, /(?:class|interface|enum)\s+(\w+)/g);
      }

      private extractCppContext(content: string): string {
        return this.extractFunctionsAndClasses(content, /(?:class|struct)\s+(\w+)/g);
      }

      private extractFunctionsAndClasses(content: string, regex: RegExp): string {
        const matches = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
          matches.push(match[0]);
        }
        return matches.join('\n');
      }
    }
