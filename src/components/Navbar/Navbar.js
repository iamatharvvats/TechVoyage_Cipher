import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Image from "./logo-iet.png";
import { useCookies } from 'react-cookie';

export default function Navbar() {
    const [userIdCookie] = useCookies(['userId']);
    const userId = userIdCookie.userId;
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <Link className={styles.navLink} to="/">
                        <img src={Image} alt="logo" width="50" />
                        {/* <img src='https://iet.nitk.ac.in/assets/images/club/cipher/cipher.webp' alt="logo" width="50" /> */}
                    </Link>
                    <div className={styles.navbarCollapse} id="navbarSupportedContent">
                        <ul className={styles.navbarNav}>
                            {userId !== 'undefined' ? (
                            <>
                            <li className={styles.navItem}>
                                    <Link className={styles.navLink} to={`/`} >
                                        Home
                                    </Link>
                            </li>
                            <li className={styles.navItem}>
                                    <Link className={styles.navLink} to={`/questions`} >
                                        Questions
                                    </Link>
                            </li>
                            </>
                                ):(
                                    <Link className={styles.navLink} to={`/#login`} >
                                        Login
                                    </Link>
                                )}
                            <li className={styles.navItem}>       
                                <Link className={styles.navLink} to="/about">
                                    About
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to="/rules">
                                    Rules
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to="/leaderboard">
                                    Leaderboard
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                            {userId !== 'undefined' ? (
                            <>
                            <Link className={styles.navLink} to={`/#login`} >
                                Logout
                            </Link>
                            </>
                                ):(null)}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}