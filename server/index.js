const express = require('express');
const path = require('path');
const fs = require('fs'); 
const app = express();

const PORT = process.env.PORT || 80;
const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));
// here we serve the index.html page

app.get('/*', (req, res, next) => {
        
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error leyendo el archivo index', err);
            return res.status(404).end()
        }
        // inject meta tags
        
        htmlData = htmlData.replace(
                "__META_TITLE__",
                `${"Titulo del post normal"}`
        )
        .replace('__META_OG_TITLE__', "Titulo del post")
        .replace('__META_OG_DESCRIPTION__', "descripcion del post og")
        .replace('__META_DESCRIPTION__', "descripcion del post")
        .replace('__META_OG_IMAGE__', "https://siccic.com/backend/uploads/blue_logo_da5c34b1b7.png")
        return res.send(htmlData);
    });
});
// listening...
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error durante el inicio de la app', error);
    }
    console.log("listening on " + PORT + "...");
    
});
