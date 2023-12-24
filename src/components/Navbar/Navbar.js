import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Image from "./logo-iet.png";
import { useParams } from 'react-router-dom';

export default function Navbar() {
    let { userId } = useParams();
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <Link className={styles.navbarHeader} to={`/questions/${userId}`}>
                        <img src={Image} alt="logo" width="50" />
                    </Link>
                    <div className={styles.navbarCollapse} id="navbarSupportedContent">
                        <ul className={styles.navbarNav}>
                        <li className={styles.navItem}>
                                <Link className={styles.navLink} to={`/questions/${userId}`}>
                                    Home
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} aria-current="page" to={`/questions/${userId}/about`}>
                                    About
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to={`/questions/${userId}/rules`}>
                                    Rules and Regulation
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to={`/questions/${userId}/leaderboard`}>
                                    LeaderBoard
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to={`/`}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}


