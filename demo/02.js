const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');

  const dataSource = ['Hello', 'World'];

  setInterval(() => {
    let message;

    if (dataSource.length > 0) {
      message = `data: ${dataSource[0]}\n\n`;

      dataSource.shift();
    } else {
      message = '';
    }

    res.write(message);
  }, 1000);
});

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});