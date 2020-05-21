import { graphql, useStaticQuery } from 'gatsby';

//El fragment GatsbyImageSharpFluid_withWebp es propio de gatsby-plugin-sharp
//Los efectos internos a fluid son propios de gatsby-transformer-sharp
const useInicio = () => {
    
    const resultado = useStaticQuery(
        graphql`
            query {
                allStrapiPaginas( filter: { nombre: { eq: "Inicio" } } ){
                nodes {
                    id
                    nombre
                    contenido
                    imagen {
                        sharp: childImageSharp {
                            fluid( maxWidth: 1200 duotone: {
                                highlight: "#222222", shadow: "#192550", opacity: 30
                            } ) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
        }
        `
    );

    return resultado.allStrapiPaginas.nodes.map( inicio => ({
        nombre: inicio.nombre,
        contenido: inicio.contenido,
        imagen: inicio.imagen
    }))

}
 
export default useInicio;