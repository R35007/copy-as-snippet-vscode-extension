import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "copy-as-snippet" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('copy-as-snippet.copyAsSnippet', () => {


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

			// Copy to clipboard
			vscode.env.clipboard.writeText(snippetStringWithoutBrackets);

			// Show copied Message
			vscode.window.showInformationMessage('Snippet Copied to clipboard 📋');
		}
	}));

}

// this method is called when your extension is deactivated
export function deactivate() { }
