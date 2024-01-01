import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Image from "./logo-iet.png";
import { useParams } from 'react-router-dom';
import { supabase } from "../../supabaseClient";

export default function Navbar() {
    let { userId } = useParams();
    const handleSignOut = async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          // setSession(false);
          console.log('Signed out successfully');
          alert("You are logged out successfully.")
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
      };
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
                                    <Link className={styles.navLink} to={`/`} onClick={handleSignOut}>
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