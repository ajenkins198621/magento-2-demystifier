import * as vscode from 'vscode';
import * as path from 'path';
import getFileInformation from './mapper';
import magentoFileMap from './magentoFileMap';

type FileType = {
	isEditable: boolean;
	name: string;
	description: string;
	paths?: PathInfo[];
};

type PathInfo = {
	directory: string; // app, bin, dev, etc.
	title: string; // Application Code, Command Line Scripts, etc.
	description: string; // Description of the directory
};

export function activate(context: vscode.ExtensionContext) {
	const myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	context.subscriptions.push(myStatusBarItem);

	// Update status bar item based on active text editor
	vscode.window.onDidChangeActiveTextEditor(() => {
		updateStatusBarItem(myStatusBarItem);
	});

	// Initial update
	updateStatusBarItem(myStatusBarItem);
}

function updateStatusBarItem(statusBarItem: vscode.StatusBarItem): void {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const filePath = editor.document.uri.fsPath;

		const fileInfo = getFileInformation(filePath, magentoFileMap);

		// const fileType = detectFileType(filePath); // Implement this function based on your logic

		// const editableIcon = '$(pencil)';
		// const nonEditableIcon = '$(x)';

		// const icon = fileType.isEditable ? editableIcon : nonEditableIcon;

		// statusBarItem.text = `${icon} Magento Type: ${fileType.name}`;


		if(fileInfo.pathSteps.length > 0) {
			statusBarItem.text = `${fileInfo.pathSteps[fileInfo.pathSteps.length - 1].title}`;
		}
		statusBarItem.show();
	} else {
		statusBarItem.hide();
	}
}
