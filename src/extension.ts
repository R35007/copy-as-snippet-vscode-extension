import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "copy-as-snippet" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('copy-as-snippet.copyAsSnippetObj', () => {

		// Get Selected Text
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const text = editor.document.getText(selection);
			const selectedChunk = text.replace("\r", '').split("\n");
			const body = selectedChunk.length === 1 ? selectedChunk[0] : selectedChunk;

			const snippet = {
				"Short Description": {
					prefix: "prefix",
					body,
					description: "Long Description"
				}
			}

			const snippetString = JSON.stringify(snippet, null, 2);
			
			// remove first and last char from string
			const snippetStringWithoutBrackets = snippetString.substring(1, snippetString.length - 1);
			// remove leading and trailing newline from a string
			const snippetStringWithoutNewline = snippetStringWithoutBrackets.replace(/^\s*[\r\n]/gm, '').replace(/[\r\n]\s*$/gm, '');
			// Copy to clipboard
			vscode.env.clipboard.writeText(snippetStringWithoutNewline.trim());
			// Show copied Message
			vscode.window.showInformationMessage('Snippet Copied to clipboard 📋');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('copy-as-snippet.copyAsSnippetBody', () => {
		// Get Selected Text
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const text = editor.document.getText(selection);
			const selectedChunk = text.replace("\r", '').split("\n");
			const body = selectedChunk.length === 1 ? selectedChunk[0] : selectedChunk;

			const snippetString = JSON.stringify(body, null, 2);
			// remove leading and trailing newline from a string
			const snippetStringWithoutNewline = snippetString.replace(/^\s*[\r\n]/gm, '').replace(/[\r\n]\s*$/gm, '');
			// Copy to clipboard
			vscode.env.clipboard.writeText(snippetStringWithoutNewline.trim());
			// Show copied Message
			vscode.window.showInformationMessage('Snippet Copied to clipboard 📋');
		}
	}));

}

// this method is called when your extension is deactivated
export function deactivate() { }
