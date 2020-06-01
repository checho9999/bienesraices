const urlSlug = require('url-slug');

//Luego de instalar la dependencia npm install -D @hot-loader/react-dom agregamos el siguiente
//codigo, para que no nos tire el warning react-hot-dom patch is not detected. React 16.6+ 
//features may not work.
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
    const config = getConfig()
    if (stage.startsWith('develop') && config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom': '@hot-loader/react-dom'
      }
    }
  }

//Utilizamos el archivo gatsby-node.js para poder crear paginas dinamicas con 
//programacion(ya que si bien en este proyecto son solo 6 propiedades, a futuro seria muy 
//complejo si el numero de paginas fuera mayor) para lo cual accederemos a la base de 
//datos para obtener la cantidad de propiedades existentes mediante el slug, para luego 
//con esta cantidad llamar al template que mostrara el detalle de los datos de cada 
//propiedad(cada vez que se ejecute el actions.createPage, en nuestro caso seria una 
//ejecucion por cada propiedad, se va a crear en la carpeta public/page-data la 
//pagina dinamica correspodiente a cada propiedad mediante su nombre);
//Analogo a lo hecho con las propiedades(para generar paginas dinamicamente), ahora tambien 
//accederemos a la base de datos para obtener la cantidad de paginas existentes mediante el 
//slug, para luego con esta cantidad llamar al template que mostrara el detalle de los datos 
//de cada pagina(cada vez que se ejecute el actions.createPage, en nuestro caso seria una 
//ejecucion por cada pagina, se va a crear en la carpeta public/page-data la pagina dinamica 
//correspodiente a cada pagina mediante su nombre), teniendo en cuenta que se incorprara el 
//filtro nombre ne "Inicio", para que la pagina index no se genere dinamicamente (solo se 
//crearan las paginas Nosotros y Propiedades).
exports.createPages = async ( { actions, graphql, reporter } ) => {
    const resultado = await graphql(`
        query {
            allStrapiPropiedades {
                nodes {
                    nombre
                    id
                }
            }
            allStrapiPaginas( filter: { nombre: { ne: "Inicio" } }) {
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
    //Si el query nos devuelve al menos una pagina(en nuestro nosotros y propiedades, ya que 
    //inicio fue desechada por el filtro del query ya que en el proyecto seria la pagina 
    //equivalente al componente principal por defecto index), entonces llamamos al template 
    //con el slug correspondiente
    const paginas = resultado.data.allStrapiPaginas.nodes;

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

    //Creamos los templates para paginas
    paginas.forEach( pagina => {
        actions.createPage({
            path: urlSlug( pagina.nombre ),
            component: require.resolve('./src/components/paginas.js'),
            context: {
                id: pagina.id
            }
        })
    } )
} 