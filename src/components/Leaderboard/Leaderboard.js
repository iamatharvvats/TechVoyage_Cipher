import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'C:/Users/ATHARV VATS/questions/src/components/Navbar/Navbar';
import styles from "./Leaderboard.module.css";

function ProductTable({ teamlists }) {
    return (
        <table className={`${styles.table} ${styles.container}`}>
            <thead>
                <tr>
                    <th scope="col">Sno</th>
                    <th scope="col">TeamName</th>
                    <th scope="col">Points</th>
                </tr>
            </thead>
            <tbody>
                {teamlists.length === 0 ? (
                    <tr>
                        <td colSpan="3" className={styles.noItems}>
                            No items to display
                        </td>
                    </tr>
                ) : (
                    teamlists.map((team, index) => (
                        <tr key={team.sno}>
                            <td>{index + 1}</td>
                            <td>{team.name}</td>
                            <td>{team.points}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

ProductTable.propTypes = {
    teamlists: PropTypes.array.isRequired,
};

function Leaderboard() {
    const [teamlist, setTeamlist] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/teamlists');
                const data = await response.json();
                setTeamlist(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const sortedTeams = [...teamlist].sort((a, b) => b.points - a.points);

    return (
        <>
        <Navbar />
            <div className={styles.container}>
                <h2 className={styles.heading}>LeaderBoard</h2>
                <ProductTable teamlists={sortedTeams} />
            </div>
        </>
    );
}

export default Leaderboard;