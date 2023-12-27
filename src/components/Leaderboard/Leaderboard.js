import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from "../Navbar/Navbar"
import styles from "./Leaderboard.module.css";
import { supabase } from '../../createClient'; 

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
            const { data, error } = await supabase.from('leaderboard').select('id, teamname, points');
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
        <div className={styles.ocean}>
            <div className={styles.wave}></div>
            <div className={`${styles.wave} ${styles.wave2}`}></div>
        </div>
            <div className={styles.container}>
                <h2 className={styles.heading}>LeaderBoard</h2>
                <ProductTable teamlists={teamlist} />
            </div>
        </>
    );
}

export default Leaderboard;
