import { z } from 'zod';

    export const configSchema = z.object({
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
