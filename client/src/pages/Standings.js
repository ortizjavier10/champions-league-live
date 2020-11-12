import React, {useEffect, useState } from 'react';
import { API_KEY } from '../Config';

// var axios = require("axios").default;

const Standings = () => {

    const [groups, setGroups ] = useState(null);
    

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
            .then(data => {
                console.log(data.records)
                setGroups(data);
            
            })

            .catch(err => {
                console.error(err);
            });
        };
        // getTeams();
    
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
                {groups && groups.records.map((group, index) => (
                <div className="group" key={index}>
                    <h3>Team {index + 1}</h3>

                    <div className="details">
                        <h3>{group.team} </h3>
                        <p>Matches Played:{group.played}</p>
                        <p>Total Points:{group.points}</p>
                    </div>
                </div>
                )) }
            </div>
        </div>
    )
}

export default Standings;