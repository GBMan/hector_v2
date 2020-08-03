import React from 'react';
import { Link } from 'react-router-dom';

export default function BtnGroupe(props) {
    const {
        title,
        route,
        thumbs,
        alt, 
        sizes = `
            (min-width:0px) and (max-width:639px) 50vw, 
            (min-width:640px) and (max-width:959px) 33.3vw, 
            (min-width:960px) and (max-width:1279px) 25vw, 
            (min-width:1280px) and (max-width:1599px) 20vw, 
            (min-width:1600px) and (max-width:1919px) 16.7vw, 
            50vw`
    } = props;

    let a = []
    for (let path in thumbs) {
        a.push(`${thumbs[path]} ${path}w`)
    }
    const srcSet = a.join(", ")

    return (
        <Link className="btn btn--img-container btn--groupe-img-container" to={route}>
            <img 
                className="btn--img" 
                src={thumbs[0]} 
                srcSet={srcSet}
                sizes={sizes} 
                alt={alt} 
            />
            <span className="btn--groupe-title">{title}</span>
        </Link>
    )
}
