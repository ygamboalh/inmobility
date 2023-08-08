const express = require('express');
const path = require('path');
const fs = require('fs'); 
const { default: axios } = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');
let property = null;
let propertyId = null;

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));


app.get('/auth/signin', (req, res, next) => {
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
                        .replace('__META_OG_TITLE__', "Sistema CIC")
                        .replace('__META_OG_DESCRIPTION__', "Inicio de sesión en el Sistema CIC")
                        .replace('__META_DESCRIPTION__', "Inicio de sesión en el Sistema CIC")
                        .replace('__META_OG_IMAGE__', "https://siccic.com/backend/uploads/blue_logo_da5c34b1b7.png")
                return res.send(htmlData);

        })
});
 // here we serve the index.html page
app.get('/', (req, res, next) => {
        
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error leyendo el archivo index', err);
            return res.status(404).end()
        }
        // inject meta tags
        
        htmlData = htmlData.replace(
                "__META_TITLE__",
                "Sistema CIC"
        )
        .replace('__META_OG_TITLE__', "Sistema CIC")
        .replace('__META_OG_DESCRIPTION__', "Venta y Alquiler de inmuebles y propiedades")
        .replace('__META_DESCRIPTION__', "Venta y Alquiler de inmuebles y propiedades")
        .replace('__META_OG_IMAGE__', "https://siccic.com/backend/uploads/blue_logo_da5c34b1b7.png")
        return res.send(htmlData);
    });
});
app.get('/admin/properties/property-detail/:id', (req, res, next) => {
        
        if (typeof (parseInt(req.params.id)) === 'number') {
           propertyId = parseInt(req.params.id);
        }
        console.log("id de la property",res);
        const response = axios.get(`https://siccic.com/backend/api/properties/${propertyId}?populate=*`, {}).then((response) => { 
                property = response.data.data.attributes;
                //console.log('respuesta', property);
        }).catch((error) => { /* console.log('ocurrio este error', error); */ })
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error leyendo el archivo index', err);
            return res.status(404).end()
        }
        // inject meta tags
        htmlData = htmlData.replace(
                "__META_TITLE__",
                property?.categories.data[0].attributes.nombre
        )
        .replace('__META_OG_TITLE__', property?.categories.data[0].attributes.nombre)
        .replace('__META_OG_DESCRIPTION__', `${property?.tipoPropiedad} - ${property?.provincia} - ${property?.canton} \n ${property?.moneda}${property?.precio}`)
        .replace('__META_DESCRIPTION__', property?.tipoPropiedad)
        .replace('__META_OG_IMAGE__', `https://siccic.com/backend${property?.photos.data[0].attributes.url}`)
            
        return res.send(htmlData);
    });
});
app.get('/home/visit-record', (req, res, next) => {
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
                        .replace('__META_OG_TITLE__', "Sistema CIC")
                        .replace('__META_OG_DESCRIPTION__', "Inicio de sesión en el Sistema CIC")
                        .replace('__META_DESCRIPTION__', "Inicio de sesión en el Sistema CIC")
                        .replace('__META_OG_IMAGE__', "https://siccic.com/backend/uploads/blue_logo_da5c34b1b7.png")
                return res.send(htmlData);

        })
});
// listening...
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error durante el inicio de la app', error);
    }
    console.log("listening on " + PORT + "...");
    
});
