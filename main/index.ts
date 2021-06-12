import { app, BrowserWindow } from "electron";
import path from "path";
import si from "systeminformation";

let mainWindow: Electron.BrowserWindow | null;

si.cpuTemperature().then(r=>{
	console.log(r)
});

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 700,
		backgroundColor: "#393a41",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (process.env.NODE_ENV === "development") {
		mainWindow.webContents.on("did-frame-finish-load", () => {
			mainWindow?.webContents.once("devtools-opened", () => {
				mainWindow?.focus();
			});
			mainWindow?.webContents.openDevTools();
		});
	}

	if (process.env.NODE_ENV === "development") {
		mainWindow.loadURL("http://localhost:4000");
	} else {
		mainWindow.loadURL(
			new URL(path.join(__dirname, "renderer/index.html"), "file://").toString()
		);
	}

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("window-all-closed", () => {
	app.quit();
});

app.on("ready", createWindow);

app.allowRendererProcessReuse = true;
