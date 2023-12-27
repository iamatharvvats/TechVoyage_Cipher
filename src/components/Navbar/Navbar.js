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
                {userId !== undefined ? (
                                    <Link className={styles.navLink} to={`/questions/${userId}`}>
                                        <img src={Image} alt="logo" width="50" />
                                    </Link>

                                ) : (
                                    <Link className={styles.navLink} to="/">
                                        <img src={Image} alt="logo" width="50" />
                                    </Link>
                                )}
                    <div className={styles.navbarCollapse} id="navbarSupportedContent">
                        <ul className={styles.navbarNav}>
                            <li className={styles.navItem}>
                                {userId !== undefined ? (
                                    <Link className={styles.navLink} to={`/questions/${userId}`}>
                                        Home
                                    </Link>

                                ) : (
                                    <Link className={styles.navLink} to="/">
                                        Home
                                    </Link>
                                )}
                            </li>
                            <li className={styles.navItem}>
                            {userId !== undefined ? (
                                    <Link className={styles.navLink} to={`/questions/${userId}/about`}>
                                        About
                                    </Link>

                                ) : (
                                    <Link className={styles.navLink} to="/about">
                                        About
                                    </Link>
                                )}
                            </li>
                            <li className={styles.navItem}>
                            {userId !== undefined ? (
                                    <Link className={styles.navLink} to={`/questions/${userId}/rules`}>
                                        Rules and Regulations
                                    </Link>

                                ) : (
                                    <Link className={styles.navLink} to="/rules">
                                        Rules and Regulations
                                    </Link>
                                )}
                            </li>
                            <li className={styles.navItem}>
                            {userId !== undefined ? (
                                    <Link className={styles.navLink} to={`/questions/${userId}/leaderboard`}>
                                        Leaderboard
                                    </Link>

                                ) : (
                                    <Link className={styles.navLink} to="/leaderboard">
                                        Leaderboard
                                    </Link>
                                )}
                            </li>
                            {userId !== undefined ? (
                                    <li className={styles.navItem}>
                                    <Link className={styles.navLink} to={`/`}>
                                        Logout
                                    </Link>
                                </li>

                                ):(null)}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}


