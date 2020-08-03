import React from 'react';

export default function BtnOeuvre(props) {
    const { 
        // title,
        // infos,
        // dimensions,
        position, 
        thumbs,
        alt, 
        handleClickImg,
        cssClass="", 
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

    function onClickImg(position, event) {
        handleClickImg(position, event);
    }

    return (
        <div className={"btn btn--img-container "+cssClass}>
            <img 
                className="btn--img" 
                src={thumbs[0]} 
                srcSet={srcSet}
                sizes={sizes} 
                alt={alt} 
                onClick={(event) => {return onClickImg(position, event);}} 
            />
        </div>
    )
}
