/**
     * Class for handling configuration migrations
     */
    export class ConfigMigration {
      /**
       * Migrate configuration to latest version
       * @param config Configuration to migrate
       */
      public migrate(config: any): any {
        if (!config) {
          return this.getDefaultConfig();
        }

        // Migration from version 1 to 2
        if (!config.version || config.version < 2) {
          config = this.migrateV1ToV2(config);
        }

        return config;
      }

      private migrateV1ToV2(config: any): any {
        return {
          ...config,
          version: 2,
          performance: {
            maxMemoryUsage: 1000,
            cacheEnabled: true,
            timeout: 30
          }
        };
      }

      private getDefaultConfig(): any {
        return {
          version: 2,
          model: {
            path: 'default-model',
            temperature: 0.7,
            maxTokens: 1000,
            contextWindowSize: 5000
          },
          performance: {
            maxMemoryUsage: 1000,
            cacheEnabled: true,
            timeout: 30
          },
          templates: {
            default: `Context:\n{context}\n\nGenerate {language} code for: {input}`,
            explain: `Context:\n{context}\n\nExplain this {language} code: {input}`,
            refactor: `Context:\n{context}\n\nRefactor this {language} code: {input}`
          },
          userSettings: {
            autoFormat: true,
            autoSave: false,
            theme: 'system'
          }
        };
      }
    }
