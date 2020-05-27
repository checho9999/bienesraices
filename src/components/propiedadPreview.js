import React from 'react';
import Iconos from './iconos';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import urlSlug from 'url-slug';

//Este Boton nos permitira acceder a las paginas de cada propiedad(creadas dinamicamente con el 
//actions.createPage del archivo gatsby-node) de forma dinamica mediante el ruteo de su slug
const Boton = styled(Link)`
    margin-top: 2rem;
    padding: 1rem;
    background-color: #75ab00;
    width: 100%;
    color: #fff;
    display: block;
    text-decoration: none;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
`;

const Card = styled.div`
    border: 1px solid #E1E1E1;

    img {
        max-width: 100%;
    }
`
const Contenido = styled.div`
    padding: 2rem;

    h3 {
        font-family: 'Lato', sans-serif;
        margin: 0 0 2rem 0;
        font-size: 2.4rem;
    }

    .precio {
        font-size: 2rem;
        color: #75AB00;
    }
`

const PropiedadPreview = ( { propiedad } ) => {    
    
    //Extraemos los datos de la propiedad recibidos desde listadoPropiedades
    const { nombre, imagen, wc, estacionamiento, habitaciones, precio } = propiedad;

    return ( 

        <Card>

            <Image
                fluid={imagen.sharp.fluid}
            />

            <Contenido>
                <h3>{nombre}</h3>

                <p className='precio'>$ {precio} </p>

                <Iconos 
                    wc={wc}
                    estacionamiento={estacionamiento}
                    habitaciones={habitaciones}
                />
                
                <Boton to={ urlSlug( nombre ) }>
                    Visitar Propiedad
                </Boton>            
            
            </Contenido>

        </Card>
     );
}
 
export default PropiedadPreview;