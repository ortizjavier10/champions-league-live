import React, {useEffect, useState } from 'react';
import { API_KEY } from '../Config';

// var axios = require("axios").default;

const Standings = () => {

    // const [groups, setGroups ] = useState([])
    

    // useEffect(() => {

        const getTeams = async () => {
            await fetch("https://heisenbug-champions-league-live-scores-v1.p.rapidapi.com/api/championsleague/table?group=A" , {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${API_KEY}`,
                "x-rapidapi-host": "heisenbug-champions-league-live-scores-v1.p.rapidapi.com"
            }
            })
            .then(res=> res.json())
            .then((data) => {
                console.log(data)
            
            })

            .catch(err => {
                console.error(err);
            });
        };
        getTeams();
    
    // const apiURL = "https://heisenbug-champions-league-live-scores-v1.p.rapidapi.com/api/championsleague/table?group=A"

    // function fetchStandings() {
    //     fetch(apiURL)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //     })
    // }

    return (
        <div className="standings">
            <h1>Champions League Standings</h1>
            <h2>Click button below to get the latest UCL standings</h2>

            {/* Fetch data from API */}
            <div>
                <button className="fetch-button" onClick={getTeams}>Fetch Standings</button>
            </div>

            <div className="groups">
                <div className="group">
                    <h3>Group</h3>

                    <div className="details">
                        <p>Team: </p>
                        <p>Matches Played:</p>
                        <p>Total Points:</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Standings;