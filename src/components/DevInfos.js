import React, { useState } from 'react'

export default function DevInfos() {
    let s = "width x height"
    let sRatio = "widthRatio x heightRatio"
    if (window) {
        s = `${window.innerWidth} x ${window.innerHeight}`
        sRatio = `${window.innerWidth*window.devicePixelRatio} x ${window.innerHeight*window.devicePixelRatio}`
    }
    const [viewportSizes, setViewportSizes] = useState(s)
    const [viewportSizesRatio, setViewportSizesRatio] = useState(sRatio)

    function roundX(n, p=0) {
        const m = Math.pow(10, p)
        return Math.round(m*n)/m
    }

    let sizes = [];
    if (window && window.addEventListener) {
        window.addEventListener('resize', () => {
            setViewportSizes(`${window.innerWidth} x ${window.innerHeight}`)
            setViewportSizesRatio(`${window.innerWidth*window.devicePixelRatio} x ${window.innerHeight*window.devicePixelRatio}`)
        }, true);
        
        const width = window.innerWidth;
        const widthRatio = width*window.devicePixelRatio;
        for (let i=1; i<10; i++) {
            sizes.push({divide:i, label:`${roundX(100/i, 1)}vw media-query : ${roundX(width/i, 1)}`})
            sizes.push({divide:i, label:`${roundX(100/i, 1)}vw pixel ratio : ${roundX(widthRatio/i, 1)}`})
        }
    }

    return (
        <>
            <div className="DevInfos">
                viewport : {viewportSizes}<br />
                viewport x pixel ratio : {viewportSizesRatio}<br />
                {sizes.map((size, i) => {
                    return (
                        <React.Fragment key={i}>
                            <span className={`DeviceInfos--mq${size.divide}`}>{size.label}</span><br />
                        </React.Fragment>
                    )
                })}
            </div>
        </>
    )
}
