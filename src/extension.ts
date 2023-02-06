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

	const provider: vscode.TreeDataProvider<string> = {
		getTreeItem: function (element: string): vscode.TreeItem | Thenable<vscode.TreeItem> {
			const item = new vscode.TreeItem2(element);
			item.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
			if (vscode.TreeItemCheckboxState !== undefined) {
				item.checkboxState = vscode.TreeItemCheckboxState.Checked;
				item.iconPath = vscode.ThemeIcon.File;
			} else {
				item.iconPath = new vscode.ThemeIcon("azure");
			}
			return item;
		},
		getChildren: function (element?: string | undefined): vscode.ProviderResult<string[]> {
			if (!element) {
				return ["Root"];
			} else if (element === "Root") {
				return ["R", "o", "o", "t"];
			} else {
				return [];
			}
		}
	};
	const treeView = vscode.window.createTreeView("myView", {
		treeDataProvider: provider
	});
	context.subscriptions.push(treeView);
}

export function deactivate() {}
