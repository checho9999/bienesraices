import React from 'react';
import { css } from '@emotion/core';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Navegacion from './navegacion';

//el logo la obtenemos con el gatsby-source-filesystem, pero en este caso no la optimizamos 
//con los plugins gatsby-transformer-sharp y gatsby-plugin-sharp, ya que al ser un svg ya
//de por si es una imagen ligera
const Header = () => {

    //Consultamos la imagen del logo
    const { logo } = useStaticQuery(graphql`
        query {
            logo: file(relativePath: { eq:"logo.svg" }) {
			    publicURL
            }
        }    
    `)

    return ( 
        <header
            css={css`
                background-color: #0D2838;
                padding: 1rem;
            `}
        >
            <div
                css={css`
                    max-width: 120rem;
                    margin: 0 auto;
                    text-align: center;

                    @media (min-width: 768px) {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                `}
            >
                <Link to='/'>
                    <img src={logo.publicURL} alt='Logotipo Bienes Raices' />
                </Link>

                <Navegacion />
            </div>
        </header>
     );
}

export default Header;