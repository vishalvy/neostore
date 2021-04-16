import React from 'react'
import Carousel from './carousel/carousel'
import TopProducts from './TopProducts/TopProducts'


function dashboard({children}) {
    return (
        <>
            <Carousel/>
            <TopProducts/>
        </>
    )
}

export default dashboard
