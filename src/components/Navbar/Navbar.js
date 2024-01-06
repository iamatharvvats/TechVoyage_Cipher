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
                                    Rules
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to="/leaderboard">
                                    Leader Board
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}