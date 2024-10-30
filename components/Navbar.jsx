import React, { useState } from 'react';
import styles from '../src/styles/navbar.module.css'
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();
    const [toogleNav, setToggleNav] = useState(false);

    function toggleMenu() {
        setToggleNav(prevState => !prevState);
    }

    async function logout() {    
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST', // Typically POST for logout
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensure cookies are sent
            });
    
            if (response.ok) {
                router.push('/login'); 
            } else {
                console.error(`Logout failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }
    

    return (
        <header className={styles.header}>
            <a href='/' className={styles.logo}>BugTrack</a>
            
        </header>
    );
}
