import * as vscode from 'vscode';
    import * as path from 'path';

    describe('Extension E2E Tests', () => {
      let extension: vscode.Extension<any>;

      beforeAll(() => {
        extension = vscode.extensions.getExtension('your-publisher.vscode-llm-codegen')!;
      });

      it('should activate successfully', async () => {
        await extension.activate();
        expect(extension.isActive).toBeTruthy();
      });

      it('should register commands', async () => {
        const commands = await vscode.commands.getCommands();
        expect(commands).toContain('llmCodegen.generate');
        expect(commands).toContain('llmCodegen.openPanel');
      });

      // Add more tests...
    });
