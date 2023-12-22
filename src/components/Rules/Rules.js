// Rules.js
import React from "react";
import styles from "./Rules.module.css"
import Navbar from "../Navbar/Navbar";

const Rules = () => {
    return (
        <>
            <Navbar />
            <div className={styles.rules}>
                <h2>Rules and Regulations</h2>
                <ol>
                    <li>Follow all instructions carefully.</li>
                    <li>Respect other participants.</li>
                    <li>Submit your entries before the deadline.</li>
                    {/* Add more rules as needed */}
                </ol>
            </div>
        </>
    );
};

export default Rules;
