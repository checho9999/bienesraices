const urlSlug = require('url-slug');

//Utilizamos el archivo gatsby-node.js para poder crear paginas dinamicas con 
//programacion(ya que si bien en este proyecto son solo 6 propiedades, a futuro seria muy 
//complejo si el numero de paginas fuera mayor) para lo cual accederemos a la base de 
//datos para obtener la cantidad de propiedades existentes mediante el slug, para luego 
//con esta cantidad llamar al template que mostrara el detalle de los datos de cada 
//propiedad(cada vez que se ejecute el actions.createPage, en nuestro caso seria una 
//ejecucion por cada propiedad, se va a crear en la carpeta public/page-data la 
//pagina dinamica correspodiente a cada habitacion mediante su nombre); 
exports.createPages = async ( { actions, graphql, reporter } ) => {
    const resultado = await graphql(`
        query {
            allStrapiPropiedades {
                nodes {
                    nombre
                    id
                }
            }
        }
    `);


    //Este console.log se puede observar desde el servidor
    // console.log(JSON.stringify(resultado.data.allStrapiPropiedades ) );

    //Si no hay resultados
    if(resultado.errors) {
        reporter.panic('No hubo resultados', resultado.errors);
    }

    //Si el query nos devuelve al menos una propiedad, entonces llamamos al template con el slug correspondiente
    const propiedades = resultado.data.allStrapiPropiedades.nodes;

    //Creamos los templates de propiedades
    propiedades.forEach( propiedad => {
        actions.createPage({
            path: urlSlug( propiedad.nombre ),
            component: require.resolve('./src/components/propiedades.js'),
            context: {
                id: propiedad.id
            }
        })
    } )
} 