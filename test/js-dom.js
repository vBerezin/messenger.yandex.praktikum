const { JSDOM } = require('jsdom');

const jsdom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <title>Title</title>
        </head>
      <body>
        <div id="app">Загрузка...</div>
      </body>
      </html>
    `);

global.window = jsdom.window;
