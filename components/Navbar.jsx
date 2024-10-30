import React, { useState } from 'react';
import styles from "@/styles/navbar.module.css"
import { useRouter } from 'next/router';

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
