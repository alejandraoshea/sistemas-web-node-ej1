const http = require('http');
const os = require('os');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

console.log('=== Servidor Node.js Iniciado ===');
console.log(`Versión de Node.js: ${process.version}`);
console.log(`Sistema operativo: ${os.type()} ${os.release()} (${os.platform()})`);
console.log(`Arquitectura: ${os.arch()}`);
console.log(`CPU: ${os.cpus()[0].model}`);
console.log(`Número de núcleos: ${os.cpus().length}`);
console.log(`Memoria total: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
console.log('=================================\n');

const startTime = process.uptime();

function showSystemInfo() {
  console.log('\n--- Información del sistema ---');

  if (config.showCPU) {
    const cpus = os.cpus();
    const avgLoad = os.loadavg()[0].toFixed(2);
    console.log(`Uso medio de CPU (1 min): ${avgLoad}`);
  }

  if (config.showMemory) {
    const usedMemory = process.memoryUsage();
    console.log(`Memoria usada por Node.js: ${(usedMemory.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Memoria libre del sistema: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
  }

  if (config.showUptimeSystem) {
    console.log(`Tiempo activo del sistema: ${(os.uptime() / 60).toFixed(2)} minutos`);
  }

  if (config.showUptimeNode) {
    console.log(`Tiempo activo de Node.js: ${(process.uptime() / 60).toFixed(2)} minutos`);
  }

  console.log('-------------------------------');
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor Node.js en ejecución\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

setInterval(showSystemInfo, config.intervalSeconds * 500);
