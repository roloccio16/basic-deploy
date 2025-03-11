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
