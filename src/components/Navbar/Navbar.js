import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Image from "./logo-iet.png";
import { createClient } from "@supabase/supabase-js";
import { useCookies } from 'react-cookie';

const supabase = createClient(
    "https://psocuvldupkzajpvkgua.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");


    export default function Navbar() {
        const [userIdCookie] = useCookies(['userId']);
        const userId = userIdCookie.userId;
        return (
            <>
                <nav className={styles.navbar}>
                    <div className={styles.container}>
                        <Link className={styles.navLink} to="/">
                            <img src={Image} alt="logo" width="50" />
                        </Link>
                        <div className={styles.navbarCollapse} id="navbarSupportedContent">
                            <ul className={styles.navbarNav}>
                                <li className={styles.navItem}>
                                    {userId !== 'undefined' ? (
                                        <Link className={styles.navLink} to={`/questions`} >
                                            Questions
                                        </Link>
                                    ):(null)}
                                </li>
                                <li className={styles.navItem}>       
                                    <Link className={styles.navLink} to="/about">
                                        About
                                    </Link>
                                </li>
                                <li className={styles.navItem}>
                                    <Link className={styles.navLink} to="/rules">
                                        Rules and Regulations
                                    </Link>
                                </li>
                                <li className={styles.navItem}>
                                    <Link className={styles.navLink} to="/leaderboard">
                                        Leaderboard
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
    
            </>
        );
    }
    
/*import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Image from "./logo-iet.png";

export default function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <div className={styles.navbarHeader} >
                        <img src={Image} alt="logo" width="50" />
                    </div>
                    <div className={styles.navbarCollapse} id="navbarSupportedContent">
                        <ul className={styles.navbarNav}>
                            <li className={styles.navItem}>
                                <div className={styles.navLink} aria-current="page" >
                                    Home
                                </div>
                            </li>
                            <li className={styles.navItem}>
                                <div className={styles.navLink} aria-current="page" >
                                    About
                                </div>
                            </li>
                            <li className={styles.navItem}>
                                <div className={styles.navLink} aria-current="page" >
                                    Team
                                </div>
                            </li>
                            <li className={styles.navItem}>
                                <div className={styles.navLink} aria-current="page" >
                                    Projects
                                </div>
                            </li>
                            <li className={styles.navItem}>
                                <div className={styles.navLink} aria-current="page" >
                                    Events
                                </div>
                            </li>
                            <li className={styles.navItem}>
                                <div className={styles.navLink} aria-current="page" >
                                    Blogs
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}*/