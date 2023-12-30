import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from "../Navbar/Navbar"
import styles from "./Leaderboard.module.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://psocuvldupkzajpvkgua.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");
function ProductTable({ teamlists }) {
    return (
        <table className={`${styles.table} ${styles.container}`}>
            <thead>
                <tr>
                    <th scope="col">Sno</th>
                    <th scope="col">Team Name</th>
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
                        <tr key={team.id}>
                            <td>{index + 1}</td>
                            <td>{team.teamname}</td>
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
                // console.log('Before Supabase Query');
                const { data, error } = await supabase.from('users').select('id,teamname,email,points');
                // console.log('After Supabase Query', data, error);
                if (error) {
                  console.error('Error fetching data:', error);
                } else {
                //   console.log('Fetched data:', data);
                  const sortedTeams = [...data].sort((a, b) => b.points - a.points);
                  setTeamlist(sortedTeams);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
              }
        };

        fetchData();
    }, []);

    return (
        <>
        <Navbar />
            <div className={styles.container}>
                <h2 className={styles.heading}>LeaderBoard</h2>
                <ProductTable teamlists={teamlist} />
            </div>
        </>
    );
}

export default Leaderboard;