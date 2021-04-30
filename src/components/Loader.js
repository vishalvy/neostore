import React from 'react'
import LoadingScreen from 'react-loading-screen'

function Loader() {
    return (
        <>
            <LoadingScreen
                loading={true}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                // logoSrc='/logo.png'
                text='Please wait'
            />
        </>
    )
}

export default Loader
