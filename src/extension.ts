import * as vscode from 'vscode';
import getFileInformation from './mapper';
import magentoFileMap from './magentoFileMap';
import { PathInfo } from './types';

let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = 'extension.show-detailed-file-info';
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

		const filePathSteps = getFileInformation(filePath, magentoFileMap);

		if (filePathSteps.length > 0) {
			statusBarItem.text = `${filePathSteps[filePathSteps.length - 1].title}`;
		}

		registerMoreInfoWindow(context, filePathSteps, filePath);

		statusBarItem.show();
	}
}

function registerMoreInfoWindow(context: vscode.ExtensionContext, filePathSteps: PathInfo[], fullPath: string = ''): void {
	context.subscriptions.push(vscode.commands.registerCommand('extension.show-detailed-file-info', () => {
		let pathHtml = '';

		let fileInfo: PathInfo = {
			step: '',
			title: '',
			description: '',
		};

		filePathSteps.forEach((step, idx) => {
			pathHtml += `<li>
        <strong>/${step.step}</strong> - ${step.title}
        <ul>
          <li>${step.description}</li>
        </ul>
      </li>`;
			if (idx === filePathSteps.length - 1) {
				fileInfo = step;
			}
		});

		// Set the HTML content for the webview panel
		const html = `
      <html>
      <body>
        <!-- Your detailed information content goes here -->
        <h1>Magento File Information</h1>
        <p>File name: ${fileInfo.title}</p>
        <p>Path Info: ${fileInfo.description}</p>
        <p>Full Path: ${fullPath}</p>
        <ul>
          ${pathHtml}
        </ul>
      </body>
      </html>
    `;

		// Create and show the webview panel
		const panel = vscode.window.createWebviewPanel(
			`moreInformation_${fullPath}`, // Identifies the panel
			`Magento File Information`, // Title displayed in the UI
			vscode.ViewColumn.Two, // Editor column to show the panel
			{}
		);
		panel.webview.html = html;
	}));
}

export function deactivate() {
	if (myStatusBarItem) {
		myStatusBarItem.dispose();
	}
}
