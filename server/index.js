const express = require('express');
const path = require('path');
const fs = require('fs'); 
const { default: axios } = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');
let property = null;
let propertyId = null;
let portafolioId = null;
let portafolio = null;
let imageUrl = null;

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

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
        .replace('Sistema CIC', "Sistema CIC")
        .replace('Venta y Alquiler de inmuebles y propiedades', "Venta y Alquiler de inmuebles y propiedades")
        .replace('__META_DESCRIPTION__', "Venta y Alquiler de inmuebles y propiedades")
        .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
        return res.send(htmlData);
    });
});
app.get('/auth/signin', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                // inject meta tags
        
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        `${"Inicio de sesión"}`
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Inicio de sesión en el Sistema CIC")
                        .replace('__META_DESCRIPTION__', "Inicio de sesión en el Sistema CIC")
                        .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);

        })
});
 // here we serve the index.html page

app.get('/admin/properties/property-detail/:id', (req, res, next) => {

        if (typeof (parseInt(req.params.id)) === 'number') {
           propertyId = parseInt(req.params.id);
        }
        const response = axios.get(`https://backend.siccic.com/api/properties/${propertyId}?populate=*`, {}).then((response) => { 
                property = response.data.data.attributes;
                
                (property?.photos?.data !== null
                        ? imageUrl = `https://backend.siccic.com${property?.photos?.data[0]?.attributes?.url}`
                        : imageUrl = 'https://backend.siccic.com/uploads/no_image_default_0e6727a941.jpg')
        }).catch((error) => { /* console.log('ocurrio este error', error); */ })
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Sistema CIC"
                )
        .replace('Sistema CIC', property?.categories.data[0].attributes.nombre)
        .replace('Venta y Alquiler de inmuebles y propiedades', `${property?.tipoPropiedad} - ${property?.provincia} - ${property?.canton} \n ${property?.moneda}${property?.precio}`)
        .replace('__META_DESCRIPTION__', property?.tipoPropiedad)
        .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', imageUrl)
                return res.send(htmlData);
        })
});
app.get('/home/visit-record', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Registro de visita"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Registro de visita")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);

        })
});
app.get('/home/banner', (req, res, next) => { 
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Opciones"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Opciones")
                        .replace('__META_DESCRIPTION__', "Opciones")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);

        })
});
app.get('/ventas', (req, res, next) => { 
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Ventas"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Ventas")
                        .replace('__META_DESCRIPTION__', "Ventas")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);

        })
});
app.get('/user/verified-adviser', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Asesor verificado"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Asesor verificado")
                        .replace('__META_DESCRIPTION__', "Asesor verificado")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);

        })
});
app.get('/user/profile', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Perfil"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Perfil")
                        .replace('__META_DESCRIPTION__', "Perfil")
                return res.send(htmlData);

        })
});
app.get('/auth/change-password', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Cambiar contraseña"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Cambiar contraseña")
                        .replace('__META_DESCRIPTION__', "Cambiar contraseña")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);

        })
});
app.get('/home/insert-property', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Nueva propiedad o editar"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Nueva propiedad o editar")
                        .replace('__META_DESCRIPTION__', "Nueva propiedad o editar")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);

        })
});
app.get('/home/notifications', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Notificaciones"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Notificaciones")
                        .replace('__META_DESCRIPTION__', "Notificaciones")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);

        })
});
app.get('/home/upload/:id', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Cargar imágenes"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Cargar imágenes")
                        .replace('__META_DESCRIPTION__', "Cargar imágenes")
                return res.send(htmlData);

        })
});
app.get('/home/links', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Enlaces de interés"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Enlaces de interés")
                        .replace('__META_DESCRIPTION__', "Enlaces de interés")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);

        })
});
app.get('/home/search/search-results', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Resultados de la búsqueda"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Resultados de la búsqueda")
                        .replace('__META_DESCRIPTION__', "Resultados de la búsqueda")
                return res.send(htmlData);

        })
});
app.get('/home/search/property-detail/:id', (req, res, next) => {
        if (typeof (parseInt(req.params.id)) === 'number') {
           propertyId = parseInt(req.params.id);
        }
        const response = axios.get(`https://backend.siccic.com/api/properties/${propertyId}?populate=*`, {}).then((response) => { 
                property = response.data.data.attributes;
        }).catch((error) => { /* console.log('ocurrio este error', error); */ })
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                 htmlData = htmlData.replace(
                "__META_TITLE__",
                property?.categories.data[0].attributes.nombre
        )
        .replace('Sistema CIC', property?.categories.data[0].attributes.nombre)
        .replace('Venta y Alquiler de inmuebles y propiedades', `${property?.tipoPropiedad} - ${property?.provincia} - ${property?.canton} \n ${property?.moneda}${property?.precio}`)
        .replace('__META_DESCRIPTION__', property?.tipoPropiedad)
        .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', `https://backend.siccic.com${property?.photos.data[0].attributes.url}`)
            
        return res.send(htmlData);

        })
});
app.get('/home/portfolio', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Mis Portafolios"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Mis Portafolios")
                        .replace('__META_DESCRIPTION__', "Mis Portafolios")
                
                return res.send(htmlData);
        })
});
app.get('/home/portfolio/portfolio-detail', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Detalles del Portafolio"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Detalles del Portafolio")
                        .replace('__META_DESCRIPTION__', "Detalles del Portafolio")
                return res.send(htmlData);
        })
});
app.get('/home/portfolio/:id', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Portafolio"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Portafolio")
                        .replace('__META_DESCRIPTION__', "Portafolio")
                return res.send(htmlData);
        })
});
app.get('/home/portfolio/share-portfolio/:id', (req, res, next) => {
        
        if (typeof (parseInt(req.params.id)) === 'number') {
           portafolioId = parseInt(req.params.id);
        }
        
        const response = axios.get(`https://backend.siccic.com/api/portafolios/${portafolioId}?populate=*`, {}).then((response) => { 
                portafolio = response.data.data;
        }).catch((error) => { console.log('ocurrio un error'); })
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Portafolio compartido"
                )
                        .replace('Sistema CIC', "Portafolio compartido")
                        .replace('__META_DESCRIPTION__', "Portafolio compartido")
        .replace('Venta y Alquiler de inmuebles y propiedades', `${portafolio?.attributes.categoria} - ${portafolio?.attributes.properties.data.length} inmuebles `)
        .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/selling-house-apartment', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Venta de casas y apartamentos"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Venta de casas y apartamentos")
                        .replace('__META_DESCRIPTION__', "Venta de casas y apartamentos")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/rent-house-apartment', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Alquiler de casas y apartamentos"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Alquiler de casas y apartamentos")
                        .replace('__META_DESCRIPTION__', "Alquiler de casas y apartamentos")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/selling-lots', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Venta de Lotes Fincas y Terrenos"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Venta de Lotes Fincas y Terrenos")
                        .replace('__META_DESCRIPTION__', "Venta de Lotes Fincas y Terrenos")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/rent-lots', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Alquiler de Lotes Fincas y Terrenos"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Alquiler de Lotes Fincas y Terrenos")
                        .replace('__META_DESCRIPTION__', "Alquiler de Lotes Fincas y Terrenos")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/selling-comercials', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Venta de Locales Comerciales"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Venta de Locales Comerciales")
                        .replace('__META_DESCRIPTION__', "Venta de Locales Comerciales")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/rent-comercials', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Alquiler de Locales Comerciales"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Alquiler de Locales Comerciales")
                        .replace('__META_DESCRIPTION__', "Alquiler de Locales Comerciales")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/selling-buildings', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Venta de Edificios"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Venta de Edificios")
                        .replace('__META_DESCRIPTION__', "Venta de Edificios")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/rent-buildings', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Alguiler de Edificios"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Alguiler de Edificios")
                        .replace('__META_DESCRIPTION__', "Alquiler de Edificios")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/selling-store', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Venta de bodegas"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Venta de bodegas")
                        .replace('__META_DESCRIPTION__', "Venta de bodegas")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/rent-store', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Alquiler de bodegas"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Alquiler de bodegas")
                        .replace('__META_DESCRIPTION__', "Alquiler de bodegas")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/selling-office', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Venta de oficinas"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Venta de oficinas")
                        .replace('__META_DESCRIPTION__', "Venta de oficinas")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/search/rent-office', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Alquiler de oficinas"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Alquiler de oficinas")
                        .replace('__META_DESCRIPTION__', "Alquiler de oficinas")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/alquiler', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Alquiler"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Alquiler")
                        .replace('__META_DESCRIPTION__', "Alquiler")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/home/banner/visiter', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Visitante"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Visitante")
                        .replace('__META_DESCRIPTION__', "Visitante")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/user/sent-request', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Solicitud enviada"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Solicitud enviada")
                        .replace('__META_DESCRIPTION__', "Solicitud enviada")
                return res.send(htmlData);
        })
});
app.get('/user/evaluating', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "En evaluación"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "En evaluación")
                        .replace('__META_DESCRIPTION__', "En evaluación")
                return res.send(htmlData);
        })
});
app.get('/user/access-denied', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Acceso denegado"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Acceso denegado")
                        .replace('__META_DESCRIPTION__', "Acceso denegado")
                return res.send(htmlData);
        })
});
app.get('/auth/register-request', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Solicitud de registro"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Solicitud de registro")
                        .replace('__META_DESCRIPTION__', "Solicitud de registro")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/auth/reset-password', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Recuperar clave"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Recuperar clave")
                        .replace('__META_DESCRIPTION__', "Recuperar clave")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/auth/forgot-password', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Clave olvidada"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Clave olvidada")
                        .replace('__META_DESCRIPTION__', "Clave olvidada")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/user/terms', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Términos y condiciones"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Términos y condiciones")
                        .replace('__META_DESCRIPTION__', "Términos y condiciones")
                .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
                return res.send(htmlData);
        })
});
app.get('/user/logout', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Salir"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Salir")
                        .replace('__META_DESCRIPTION__', "Salir")
                return res.send(htmlData);
        })
});

app.get('/admin/properties/property-detail/:id', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Detalles de la propiedad"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Detalles de la propiedad")
                        .replace('__META_DESCRIPTION__', "Detalles de la propiedad")
                return res.send(htmlData);
        })
});
app.get('/admin/properties/insert-property', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Insertar propiedad"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Insertar propiedad")
                        .replace('__META_DESCRIPTION__', "Insertar propiedad")
                return res.send(htmlData);
        })
});
app.get('/admin/properties/insert-property/:id', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Editar propiedad"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Editar propiedad")
                        .replace('__META_DESCRIPTION__', "Editar propiedad")
                return res.send(htmlData);
        })
});
app.get('/admin/properties', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Insertar o editar propiedad"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Insertar o editar propiedad")
                        .replace('__META_DESCRIPTION__', "Insertar o editar propiedad")
                return res.send(htmlData);
        })
});
app.get('/admin/users', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Usuarios"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Usuarios")
                        .replace('__META_DESCRIPTION__', "Usuarios")
                return res.send(htmlData);
        })
});
app.get('/admin/users/insert-user', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Insertar usuarios"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Insertar usuarios")
                        .replace('__META_DESCRIPTION__', "Insertar usuarios")
                return res.send(htmlData);
        })
});
app.get('/admin/links/insert-link', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Insertar enlace"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Insertar enlace")
                        .replace('__META_DESCRIPTION__', "Insertar enlace")
                return res.send(htmlData);
        })
});
app.get('/admin/links/insert-link/:id', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Editar enlace"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Editar enlace")
                        .replace('__META_DESCRIPTION__', "Editar enlace")
                return res.send(htmlData);
        })
});
app.get('/admin/users/insert-user/:id', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Editar usuario"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Editar usuario")
                        .replace('__META_DESCRIPTION__', "Editar usuario")
                return res.send(htmlData);
        })
});
app.get('/admin/upload/:id', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Cargar imagen"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Cargar imagen")
                        .replace('__META_DESCRIPTION__', "Cargar imagen")
                return res.send(htmlData);
        })
});
app.get('/home/investor', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Inversionistas"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Inversionistas")
                        .replace('__META_DESCRIPTION__', "Inversionistas")
                return res.send(htmlData);
        })
});
app.get('/home/search/pdf/:id', (req, res, next) => {
        if (typeof (parseInt(req.params.id)) === 'number') {
           propertyId = parseInt(req.params.id);
        }
        const response = axios.get(`https://backend.siccic.com/api/properties/${propertyId}?populate=*`, {}).then((response) => { 
                property = response.data.data.attributes;
                
                (property?.photos?.data !== null
                        ? imageUrl = `https://backend.siccic.com${property?.photos?.data[0]?.attributes?.url}`
                        : imageUrl = 'https://backend.siccic.com/uploads/no_image_default_0e6727a941.jpg')
        }).catch((error) => { /* console.log('ocurrio este error', error); */ })
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Sistema CIC"
                )
        .replace('Sistema CIC', property?.categories.data[0].attributes.nombre)
        .replace('Venta y Alquiler de inmuebles y propiedades', `${property?.tipoPropiedad} - ${property?.provincia} - ${property?.canton} \n ${property?.moneda}${property?.precio}`)
        .replace('__META_DESCRIPTION__', property?.tipoPropiedad)
        .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', imageUrl)
                return res.send(htmlData);
        })
});
app.get('*', (req, res, next) => {
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                if (err) {
                        console.error('Error leyendo el archivo index', err);
                        return res.status(404).end()
                }
                htmlData = htmlData.replace(
                        "__META_TITLE__",
                        "Sistema CIC"
                )
                        .replace('Sistema CIC', "Sistema CIC")
                        .replace('Venta y Alquiler de inmuebles y propiedades', "Venta y Alquiler de inmuebles y propiedades")
                        .replace('https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png', "https://backend.siccic.com/uploads/blue_logo_d00dd4ed3a.png")
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
