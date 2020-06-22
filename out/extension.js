"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    if (!fs.existsSync("owlsCheckData.txt")) {
        fs.writeFile("owlsCheckData.txt", "owlsCheck Data File.", (err) => {
            if (err) {
                throw err;
            }
            ;
            console.log("File created");
        });
    }
    console.log('Congratulations, your extension "owlscheck" is now active!');
    let bar = vscode.window.createStatusBarItem();
    bar.text = "$(calendar)";
    bar.command = "owlscheck.openCheckList";
    bar.show();
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
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
        const addButton = {
            iconPath: new vscode.ThemeIcon("add")
        };
        const delButton = {
            iconPath: new vscode.ThemeIcon("chrome-minimize")
        };
        let tmpItemArr = [];
        Data.forEach(element => {
            let elemData = element.split('%');
            if (elemData[2] !== 'completed') {
                const tmp = {
                    alwaysShow: true,
                    description: elemData[2],
                    detail: elemData[1],
                    label: elemData[0]
                };
                tmpItemArr.push(tmp);
            }
        });
        qp.buttons = [addButton, delButton];
        qp.items = tmpItemArr;
        qp.onDidTriggerButton((event) => {
            if (event === addButton) {
                let elem = qp.value;
                if (elem !== '') {
                    let elemData = elem.split('%');
                    if (elemData.length === 1) {
                        fs.appendFileSync('owlsCheckData.txt', elemData[0] + "%%inProgress\n");
                        vscode.window.showInformationMessage('item added');
                    }
                    if (elemData.length === 2) {
                        fs.appendFileSync('owlsCheckData.txt', elemData[0] + "%" + elemData[1] + "%inProgress\n");
                        vscode.window.showInformationMessage('item added');
                    }
                    qp.hide();
                }
            }
            if (event === delButton) {
                let elem = qp.value;
                if (elem !== '') {
                    let someStr = Data.find((tmp) => {
                        if (tmp.indexOf(elem) !== -1) {
                            return true;
                        }
                        return false;
                    });
                    let partStr = someStr === null || someStr === void 0 ? void 0 : someStr.slice(0, someStr.lastIndexOf('%'));
                    if (someStr !== undefined) {
                        let newStr = stringData.replace(new RegExp(someStr, 'g'), partStr + "% Completed");
                        fs.writeFileSync('owlsCheckData.txt', newStr);
                    }
                    qp.hide();
                }
                vscode.window.showInformationMessage('Item deleted');
            }
        });
        qp.show();
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map