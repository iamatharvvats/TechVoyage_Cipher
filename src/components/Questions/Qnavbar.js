import { Link } from "react-router-dom";
import styles from "./Qnavbar.module.css";
import Image from "./logo-iet.png";

export default function Qnav() {
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <Link className={styles.navbarHeader} to="/">
                        <img src={Image} alt="logo" width="50" />
                    </Link>
                    <div className={styles.navbarCollapse} id="navbarSupportedContent">
                        <ul className={styles.navbarNav}>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} to="./Leaderboard">
                                    LeaderBoard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}