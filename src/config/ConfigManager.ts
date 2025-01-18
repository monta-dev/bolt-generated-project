import * as vscode from 'vscode';
    import { z } from 'zod';
    import { ConfigMigration } from './ConfigMigration';

    /**
     * Configuration schema using Zod
     */
    const configSchema = z.object({
      model: z.object({
        path: z.string(),
        temperature: z.number().min(0).max(1),
        maxTokens: z.number().min(1).max(4000),
        contextWindowSize: z.number().min(1).max(10000)
      }),
      performance: z.object({
        maxMemoryUsage: z.number().min(100).max(10000),
        cacheEnabled: z.boolean(),
        timeout: z.number().min(1).max(60)
      }),
      templates: z.record(z.string()),
      userSettings: z.object({
        autoFormat: z.boolean(),
        autoSave: z.boolean(),
        theme: z.enum(['light', 'dark', 'system'])
      })
    });

    export type ConfigType = z.infer<typeof configSchema>;

    /**
     * Main configuration manager class
     */
    export class ConfigManager {
      private config: ConfigType;
      private migration: ConfigMigration;

      constructor() {
        this.migration = new ConfigMigration();
        this.config = this.loadConfig();
      }

      /**
       * Get current configuration
       */
      public getConfig(): ConfigType {
        return this.config;
      }

      /**
       * Update configuration
       * @param newConfig Partial configuration
       */
      public updateConfig(newConfig: Partial<ConfigType>): void {
        try {
          const mergedConfig = { ...this.config, ...newConfig };
          this.config = this.validateConfig(mergedConfig);
          this.saveConfig();
        } catch (error) {
          this.handleError('Configuration update failed', error);
        }
      }

      /**
       * Reset to default configuration
       */
      public resetToDefaults(): void {
        this.config = this.getDefaultConfig();
        this.saveConfig();
      }

      /**
       * Load configuration from VS Code settings
       */
      private loadConfig(): ConfigType {
        const config = vscode.workspace.getConfiguration('llmCodegen');
        const rawConfig = config.get<ConfigType>('settings');

        try {
          // Migrate if needed
          const migratedConfig = this.migration.migrate(rawConfig);
          return this.validateConfig(migratedConfig);
        } catch (error) {
          this.handleError('Invalid configuration', error);
          return this.getDefaultConfig();
        }
      }

      /**
       * Save configuration to VS Code settings
       */
      private saveConfig(): void {
        const config = vscode.workspace.getConfiguration('llmCodegen');
        config.update('settings', this.config, vscode.ConfigurationTarget.Global);
      }

      /**
       * Validate configuration against schema
       * @param config Configuration to validate
       */
      private validateConfig(config: any): ConfigType {
        return configSchema.parse(config);
      }

      /**
       * Get default configuration
       */
      private getDefaultConfig(): ConfigType {
        return {
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

      /**
       * Handle errors
       * @param message Error message
       * @param error The error object
       */
      private handleError(message: string, error: unknown): void {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        vscode.window.showErrorMessage(`${message}: ${errorMessage}`);
        console.error(`${message}:`, error);
      }
    }
