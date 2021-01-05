Get started

add folder for new game in src, for instance "clicker"
add main.ts to folder
add script to package.json 
    for instance
    "clicker": "npx webpack --config webpack/webpack.config.js --entry ./src/clicker/main.ts --output-path ./dist/clicker --watch --progress"

run command "npm run clicker"
