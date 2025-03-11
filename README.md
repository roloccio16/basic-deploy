1. Creamos el repositorio local.

```bash
git init
git add .
git commit -m "build"
```
2. Subimos el repo a github

```bash
gh repo create
```
3. Creamos una app para desplegar
```bash
npm i express
npm install express
```
4. Añadimos 'node_modules' al .gitignore

5. Testeamos si la app funciona

```bash
node server.js
```
6. Lanzamos nuestros vps y creamos los secretos de Github

```
SSH_HOST=IP
SSH_USER=USUARIO
SSH_PASSWORD=CONTRASEÑA
```
7. Clonamos nuestro repo en el VPS
```bash
git clone <URL>
```
8. Updateamos el VPS y descargamos las dependencias

```bash
apt update
apt upgrade
apt install nodejs npm-y
npm install -g pm2
```

9. Instalamos dependencias de npm y Probamos a lanzar la app

```bash
cd <repo>
npm install 
node server.js
```

10. Usamos pm2 para lanzar la app en segundo plano

```bash
pm2 start server.js --name <nombre>
```

11. si modificamos la app

```bash
pm2 stop <nombre>
git pull
npm install
pm2 start server.js --name <nombre>
```

12. comenzamos a crear el deploy, creamos la carpeta '.github' y dentro otra carpeta 'workflows', por ultimo, dentro, creamos 'deploy.yml'
