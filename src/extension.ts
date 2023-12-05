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

function detectFileType(filePath: string): FileType {
	const rootPath = vscode.workspace.rootPath;

	if (rootPath) {
		const relativePath = path.relative(rootPath, filePath);
		const relativePathParts = relativePath.split(path.sep);

		const firstDirectory = relativePathParts[0];
		
		const pathInfo = determineBasePath(firstDirectory);


		const fileDetails: FileType = {
			isEditable: pathInfo.isEditable,
			paths: pathInfo.paths,
			name: relativePathParts[relativePathParts.length - 1],
			description: '',
		};
		return fileDetails;

	} else {
		return {
			isEditable: false,
			paths: [],
			name: '',
			description: '',
		};
	}
}

function determineBasePath(firstDirectory: string): {
	isEditable: boolean;
	paths: PathInfo[];
} {
	let isEditable = false;
	const paths: PathInfo[] = [];

	switch (firstDirectory) {
		case 'app':
			isEditable = true;
			paths.push({
				directory: 'app',
				title: "Application Code",
				description: "Contains Magento's core code and modules. This is where custom modules, themes, and configuration files reside. Editing is common here, especially for custom development.",
			});
		case 'bin':
			paths.push({
				directory: 'bin',
				title: "Command Line Scripts",
				description: "Holds the Magento command-line scripts, including the magento command. These files are crucial for running CLI commands and are not typically edited.",
			});
		case 'dev':
			paths.push({
				directory: 'dev',
				title: "Development Tools",
				description: "Contains tools for Magento development, like test frameworks and various scripts for dev tasks. Editing is rare and usually only done for advanced customizations or integrations.",
			});
		case 'generated':
			paths.push({
				directory: 'generated',
				title: "Generated Code",
				description: "Contains generated code like Interceptors and Factories. Magento automatically creates these files during operation. Manual editing is not recommended as Magento regenerates these files.",
			});
		case 'lib':
			paths.push({
				directory: 'lib',
				title: "Libraries",
				description: "Includes libraries that Magento or third-party modules use. It's not advisable to edit these files, as they are part of the core dependencies.",
			});
		case 'pub':
			paths.push({
				directory: 'pub',
				title: "Public Files",
				description: "This is the document root for the Magento application. It contains assets like images, JavaScript, and CSS files. While some level of editing can happen here, most static content is managed through the admin panel or via themes.",
			});
		case 'setup':
			paths.push({
				directory: 'setup',
				title: "Setup Scripts",
				description: "Contains scripts for installing and upgrading the Magento application. These files are seldom edited, as they relate to the core setup processes of Magento.",
			});
		case 'update':
			paths.push({
				directory: 'update',
				title: "Updater Scripts",
				description: "Holds scripts and data for the Magento updater application. Editing these files is not advisable as they are part of Magento's update mechanism.",
			});
		case 'var':
			paths.push({
				directory: 'var',
				title: "Variable Files",
				description: "Used for temporary files like cache, session, logs, and reports. Files in this directory are managed by Magento and should not be manually edited.",
			});
		case 'vendor':
			paths.push({
				directory: 'vendor',
				title: "Vendor Files",
				description: "Contains all Composer dependencies, including the Magento core code and third-party libraries. These files should not be edited directly; changes should be made through Composer and version control.",
			});
		default:
			break;
	}
	return {
		isEditable,
		paths,
	};
}