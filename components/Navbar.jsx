import React, { useState } from 'react';

import { useRouter } from 'next/router';
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
    const router = useRouter();
    const [toogleNav, setToggleNav] = useState(false);

    function toggleMenu() {
        setToggleNav(prevState => !prevState);
    }


    return (
        <header className={styles.header}>
            <a href='/' className={styles.logo}>BugTrack</a>
            
        </header>
    );
}
