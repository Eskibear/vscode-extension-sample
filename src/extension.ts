import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('yanzh.sample.version', () => {
		const version = context.extension.packageJSON.version;
		vscode.window.showInformationMessage(`Extension version: ${version}`);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('yanzh.sample.engines', () => {
		const engines = context.extension.packageJSON.engines;
		vscode.window.showInformationMessage(`Engines: ${JSON.stringify(engines)}`);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('yanzh.sample.targetPlatform', async () => {
		const targetFile = path.join(context.extensionPath, "targetPlatform.txt");
		const buffer = await vscode.workspace.fs.readFile(vscode.Uri.file(targetFile));
		vscode.window.showInformationMessage(`Platform: ${buffer.toString()}`);
	}));

}

export function deactivate() {}
