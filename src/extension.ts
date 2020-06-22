// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	if (!fs.existsSync("owlsCheckData.txt")){
<<<<<<< HEAD
		fs.writeFile("owlsCheckData.txt", "owlsCheck Data File.", (err) => {
=======
		fs.writeFile("owlsCheckData.txt", "owlsCheck Data File.\n", (err) => {
>>>>>>> features_v1.1
			if (err) {
				throw err;
			};

			console.log("File created");
		});
	}

	console.log('Congratulations, your extension "owlscheck" is now active!');


	let bar = vscode.window.createStatusBarItem();
<<<<<<< HEAD
	bar.text = "$(calendar)";
	bar.command = "owlscheck.openCheckList";
	bar.show();


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
=======
	bar.text = "$(checklist)";
	bar.command = "owlscheck.openCheckList";
	bar.show();

>>>>>>> features_v1.1
	vscode.commands.registerCommand('owlscheck.startOwlsCheck', () => {
		vscode.window.showInformationMessage('Hello World from OwlsCheck!');
	});

	vscode.commands.registerCommand('owlscheck.openCheckList', () => {
		let stringData = fs.readFileSync('owlsCheckData.txt', 'utf-8');
		let Data = stringData.split('\n');
		Data = Data.splice(1, Data.length - 2);
		console.log(Data);

		const qp = vscode.window.createQuickPick();
		qp.title = "Your checklist";

		const addButton: vscode.QuickInputButton = {
			iconPath: new vscode.ThemeIcon("add")
		};

<<<<<<< HEAD
		const delButton: vscode.QuickInputButton = {
			iconPath: new vscode.ThemeIcon("chrome-minimize")
=======
		const correctButton: vscode.QuickInputButton = {
			iconPath: new vscode.ThemeIcon("pass")
		};

		const delButton: vscode.QuickInputButton = {
			iconPath: new vscode.ThemeIcon("trash")
>>>>>>> features_v1.1
		};

		let tmpItemArr:vscode.QuickPickItem[] = [];
		Data.forEach(element => {
<<<<<<< HEAD
			let elemData = element.split('%');
			if(elemData[2] !== 'completed'){
=======
			if (element !== "") {
				let elemData = element.split('%');
>>>>>>> features_v1.1
				const tmp : vscode.QuickPickItem = {
					alwaysShow: true,
					description:elemData[2],
					detail:elemData[1],
					label: elemData[0]
				};
				tmpItemArr.push(tmp);
			}
		});
		
<<<<<<< HEAD
		qp.buttons = [addButton, delButton];
=======
		qp.buttons = [addButton, correctButton, delButton];
>>>>>>> features_v1.1
		qp.items = tmpItemArr;
		

		qp.onDidTriggerButton((event) => {
			if (event === addButton) {
				
				let elem = qp.value;
				if (elem !== '') {
					let elemData = elem.split('%');
					if (elemData.length === 1) {
						fs.appendFileSync('owlsCheckData.txt',elemData[0] + "%%inProgress\n");
						vscode.window.showInformationMessage('item added');
					}
					if (elemData.length === 2) {
						fs.appendFileSync('owlsCheckData.txt',elemData[0] + "%" + elemData[1] + "%inProgress\n");
						vscode.window.showInformationMessage('item added');
					}
					qp.hide();
				}
			}
<<<<<<< HEAD
			if (event === delButton) {
=======
			if (event === correctButton) {
>>>>>>> features_v1.1

				let elem = qp.value;
				if (elem !== '') {
					let someStr = Data.find((tmp) => {
						if(tmp.indexOf(elem) !== -1){
							return true;
						}
						return false;
					});
					let partStr = someStr?.slice(0, someStr.lastIndexOf('%'));
<<<<<<< HEAD
					if (someStr !== undefined){
						let newStr = stringData.replace(new RegExp(someStr, 'g'),partStr + "% Completed");
						fs.writeFileSync('owlsCheckData.txt',newStr);
=======
					if (someStr !== undefined) {
						let newStr = stringData.replace(new RegExp(someStr, 'g'),partStr + "% Completed");
						fs.writeFileSync('owlsCheckData.txt', newStr);
					}
					qp.hide();
					
				}
				vscode.window.showInformationMessage('Item status changed');
			}
			if (event === delButton) {
				let elem = qp.value;
				if (elem !== '') {
					let someStr = Data.find((tmp) => {
						if(tmp.indexOf(elem) !== -1){
							return true;
						}
						return false;
					});
					if (someStr !== undefined) {
						let newStr = stringData.replace(new RegExp(someStr, 'g'),"");
						fs.writeFileSync('owlsCheckData.txt', newStr);
>>>>>>> features_v1.1
					}
					qp.hide();
					
				}
				vscode.window.showInformationMessage('Item deleted');
			}
		});

		qp.show();
	});
}

<<<<<<< HEAD
// this method is called when your extension is deactivated
=======
>>>>>>> features_v1.1
export function deactivate() {}
