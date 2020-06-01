import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import usePropiedades from '../hooks/usePropiedades';
import PropiedadPreview from './propiedadPreview';
import listadoPropiedadesCSS from '../css/listadoPropiedades.module.css';
import useFiltro from '../hooks/useFiltro';

const ListadoPropiedades = () => {

    const resultado = usePropiedades();
    //Actualizamos el state con la coleccion de propiedades
    const [ propiedades ] = useState(resultado);
    //Actualizamos el state con la coleccion de propiedades filtradas
    const [ filtradas, guardarFiltradas] = useState([]);
    //Obetenemos desde useFiltro el filtro seleccionado de la categoria a mostrar
    const { categoria,  FiltroUI } = useFiltro();

    //Monitoreamos las actualizaciones provenientes desde useFiltro
    useEffect(() => {
        //Si se filtro alguna categoria
        if(categoria) {
            //Nos quedamos con las propiedades que coinciden con el filtro de la categoria
            const filtro = propiedades.filter( propiedad => propiedad.categoria.nombre === categoria);            
            //Actualizamos el state con el filtro
            guardarFiltradas(filtro);
        } else { //si no se filtro ninguna, mostramos todas
            //Actualizamos el state con todas las propiedades
            guardarFiltradas(propiedades);
        }
    }, [ categoria, propiedades ])

    //console.log(propiedades)

    return ( 
        <>
            <h2 css={css`
                margin-top: 5rem;
            `}>Nuestras Propiedades</h2>    
            
            { FiltroUI() }                

            <ul className={listadoPropiedadesCSS.propiedades}>
                { filtradas.map( propiedad => (
                    <PropiedadPreview 
                        key={propiedad.id}
                        propiedad={propiedad}
                    />
                ))}
            </ul>
        </>
     );
}
 
export default ListadoPropiedades;