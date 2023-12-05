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

const myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
myStatusBarItem.command = 'extension.show-detailed-file-info';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(myStatusBarItem);

	// Update status bar item based on active text editor
	vscode.window.onDidChangeActiveTextEditor(() => {
		updateStatusBarItem(myStatusBarItem, context);
	});

	// Initial update
	updateStatusBarItem(myStatusBarItem, context);
}

function updateStatusBarItem(statusBarItem: vscode.StatusBarItem, context: any): void {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const filePath = editor.document.uri.fsPath;

		const fileInfo = getFileInformation(filePath, magentoFileMap);

		// const fileType = detectFileType(filePath); // Implement this function based on your logic

		// const editableIcon = '$(pencil)';
		// const nonEditableIcon = '$(x)';

		// const icon = fileType.isEditable ? editableIcon : nonEditableIcon;

		// statusBarItem.text = `${icon} Magento Type: ${fileType.name}`;



		if (fileInfo.pathSteps.length > 0) {
			statusBarItem.text = `${fileInfo.pathSteps[fileInfo.pathSteps.length - 1].title}`;
		}
		context.subscriptions.push(vscode.commands.registerCommand('extension.show-detailed-file-info', () => {
			// Create or show the webview panel
			const panel = vscode.window.createWebviewPanel(
			  'moreInformation', // Identifies the panel
			  'More Information', // Title displayed in the UI
			  vscode.ViewColumn.One, // Editor column to show the panel
			  {}
			);
		
			// Set the HTML content for the webview panel
			panel.webview.html = `
			  <html>
			  <body>
				<!-- Your detailed information content goes here -->
				<h1>File Information</h1>
				<p>File name: YourFileName.php</p>
				<p>Description: This file does XYZ.</p>
			  </body>
			  </html>
			`;
		  }));
		

		statusBarItem.show();
	}
}
