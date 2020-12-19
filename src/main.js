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
  win.webContents.openDevTools();
}

const templateMenu = [
  {
    label: 'Início',
    submenu:
      [
        {
          label: 'Apresentação',
          click(menuItem, browserWindow, event) {
            browserWindow.loadURL(`file://${__dirname}/index.html`);
          }
        },
        { label: 'Piloto' }
      ]
  },
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
          click: function () {
            shell.openExternal('http://www.superdriftbrasil.com.br/super-drift-brasil-2020/');
          },
        },
        { label: 'Pilotos' }
      ]
  },
  {
    label: 'Entre em contato',
    click(menuItem, browserWindow, event) {
      browserWindow.loadURL(`file://${__dirname}/contato.html`);
    }
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
