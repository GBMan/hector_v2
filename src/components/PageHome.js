import React from 'react';
import BtnCategorie from './BtnCategorie';

export default function PageHome(props) {
    const { 
        categories, 
    } = props;

    return (
            <ul className="page page-home--container">
                {categories.map((categorie) => {
                    return <li key={categorie.id} className="page-home--element"><BtnCategorie
                    {...categorie} /></li>;
                })}
            </ul>
    )
}
