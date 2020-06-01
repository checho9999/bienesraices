import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import Layout from './layout';
import { graphql } from 'gatsby';
import ListadoPropiedades from './listadoPropiedades';

const ContenidoPagina = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    width: 95%;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 5rem;
    }
`;

//String(id) recibido a traves del ruteo dinamico del slug enviado desde el 
//template de paginas del archivo gatsby-node
export const query = graphql`
    query($id:String!) {
        allStrapiPaginas(filter: { id: { eq: $id}}) {
            nodes {
                nombre
                contenido 
                imagen {
                    sharp: childImageSharp {
                        fluid(maxWidth: 1200) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
  }
`

//No incluimos la pagina Inicio(solo Nosotros y Propiedades), ya que la tenemos generada por 
//defecto en el proyecto a traves del componente index 
const Paginas = ( { data: { allStrapiPaginas: { nodes } } } ) => {

    //Extraemos los datos de las pagina determinado por su slug    
    const { nombre, contenido, imagen} = nodes[0];
    //console.log(nombre);

    return ( 
        <Layout>
                <main className="contenedor">
                    <h1>{nombre}</h1>
                    <ContenidoPagina>
                        <Image
                            fluid={imagen.sharp.fluid}
                        />
                        <p>{contenido} </p>
                    </ContenidoPagina>
                </main>

                {nombre === "Propiedades" && (
                    <ListadoPropiedades />
                )}
                
        </Layout>
     );
}
 
export default Paginas;