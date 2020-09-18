import React from 'react'

const StatusBar = ({footerStatus})=>{

    return (
        <footer className="footer-style">
            &gt; {footerStatus}
        </footer>
    )
}

export default StatusBar;