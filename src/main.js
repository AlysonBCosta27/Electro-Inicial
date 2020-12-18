const { app, BrowserWindow, Menu, shell } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('src/index.html');
  //win.webContents.openDevTools();
}

const templateMenu = [
  {
    label: 'Cadastro',
    submenu:
      [
        {
          label: 'Campeonato',
          click(menuItem, browserWindow, event) {
            browserWindow.loadURL(`file://${__dirname}/items.html`);
          }
        },
        { label: 'Piloto' }
      ]
  },
  {
    label: 'Relatório',
    submenu:
      [
        { 
          label: 'Campeonatos',
          click: function() {
            shell.openExternal('https://www.electronjs.org/');
          },
        },
        { label: 'Pilotos' }
      ]
  }
]

const menu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
