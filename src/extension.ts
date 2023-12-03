import * as vscode from 'vscode';
import * as path from 'path';

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
        const fileType = detectFileType(filePath); // Implement this function based on your logic

		const editableIcon = '$(pencil)';
		const nonEditableIcon = '$(x)';

		const icon = fileType.isEditable ? editableIcon : nonEditableIcon;

        statusBarItem.text = `${icon} Magento Type: ${fileType.name}`;
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
}

function detectFileType(filePath: string): {
	isEditable: boolean;
	basePathInfo: {
		title: string;
		description: string;
	};
	name: string;
} {
    const rootPath = vscode.workspace.rootPath;

    if (rootPath) {
        const relativePath = path.relative(rootPath, filePath);
		const relativePathParts = relativePath.split(path.sep);

		const fileDetails = {
			isEditable: false,
			basePathInfo: {
				title: '',
				description: '',
			},
			name: relativePathParts[relativePathParts.length - 1],
		};

		const firstDirectory = relativePathParts[0];
		const basePathInfo = determineBasePath(firstDirectory);
		fileDetails.isEditable = basePathInfo.isEditable;
		fileDetails.basePathInfo = {
			title: basePathInfo.title,
			description: basePathInfo.description,
		};


		return fileDetails;

    } else {
        // Handle the case where there is no open workspace
        return {
			isEditable: false,
			basePathInfo: {
				title: '',
				description: '',
			},
			name: '',
		};
    }
}

function determineBasePath(firstDirectory: string) : {
	isEditable: boolean;
	title: string;
	description: string;
	} {

	switch (firstDirectory) {
		case 'app':
			return {
				isEditable: true,
				title: "Application Code",
				description: "Contains Magento's core code and modules. This is where custom modules, themes, and configuration files reside. Editing is common here, especially for custom development.",
			};
		case 'bin':
			return {
				isEditable: false,
				title: "Command Line Scripts",
				description: "Holds the Magento command-line scripts, including the magento command. These files are crucial for running CLI commands and are not typically edited.",
			};
		case 'dev':
			return {
				isEditable: false,
				title: "Development Tools",
				description: "Contains tools for Magento development, like test frameworks and various scripts for dev tasks. Editing is rare and usually only done for advanced customizations or integrations.",
			};
		case 'generated':
			return {
				isEditable: false,
				title: "Generated Code",
				description: "Contains generated code like Interceptors and Factories. Magento automatically creates these files during operation. Manual editing is not recommended as Magento regenerates these files.",
			};
		case 'lib':
			return {
				isEditable: false,
				title: "Libraries",
				description: "Includes libraries that Magento or third-party modules use. It's not advisable to edit these files, as they are part of the core dependencies.",
			};
		case 'pub':
			return {
				isEditable: false,
				title: "Public Files",
				description: "This is the document root for the Magento application. It contains assets like images, JavaScript, and CSS files. While some level of editing can happen here, most static content is managed through the admin panel or via themes.",
			};
		case 'setup':
			return {
				isEditable: false,
				title: "Setup Scripts",
				description: "Contains scripts for installing and upgrading the Magento application. These files are seldom edited, as they relate to the core setup processes of Magento.",
			};
		case 'update':
			return {
				isEditable: false,
				title: "Updater Scripts",
				description: "Holds scripts and data for the Magento updater application. Editing these files is not advisable as they are part of Magento's update mechanism.",
			};
		case 'var':
			return {
				isEditable: false,
				title: "Variable Files",
				description: "Used for temporary files like cache, session, logs, and reports. Files in this directory are managed by Magento and should not be manually edited.",
			};
		case 'vendor':
			return {
				isEditable: false,
				title: "Composer Dependencies",
				description: "Contains all Composer dependencies, including the Magento core code and third-party libraries. These files should not be edited directly; changes should be made through Composer and version control.",
			};
		default:
			return {
				isEditable: false,
				title: "Unknown",
				description: "Unknown",
			};
		}
}