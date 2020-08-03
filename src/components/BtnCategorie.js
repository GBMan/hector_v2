import React from 'react';
import {
    Link, 
//     Route,
//     Switch, 
//     useRouteMatch,
//     useParams
} from 'react-router-dom';

export default function BtnCategorie(props) {
    const {
        id,
        title,
        route,
        thumbs,
        alt
    } = props;

    let a = []
    for (let path in thumbs) {
        a.push(`${thumbs[path]} ${path}w`)
    }
    const srcSet = a.join(", ")

    return (
        <Link to={route} className="btn btn--categorie" key={id}>
            <div className="btn btn--img-container btn--categorie-img">
                <img 
                    className="btn--img" 
                    src={thumbs[0]} 
                    srcSet={srcSet} 
                    sizes="350px" 
                    alt={alt} 
                />
            </div>
            <div className="btn--categorie-txt">{title}</div>
        </Link>
    )
}
