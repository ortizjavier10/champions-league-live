import { React, useEffect, useState } from 'react';
import { API_KEY } from '../Config';
// const searchGroup = document.querySelector("#group-picker");
// var axios = require("axios").default;

const Standings = () => {

    const [groups, setGroups ] = useState([])
    // const group = document.querySelector("#group-picker").value;

    useEffect(() => {

        const getTeams = async () => {
            await fetch("https://heisenbug-champions-league-live-scores-v1.p.rapidapi.com/api/championsleague/table?group=A" , {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${API_KEY}`,
                "x-rapidapi-host": "heisenbug-champions-league-live-scores-v1.p.rapidapi.com"
            }
            })
            .then(response => response.json())
            .then((data) => {
                console.log(response)
                const groups = data.map((group) => (
                    {
                      name:  group.team,
                      value: group.team
                    }));
                setGroups(groups);
                
            })

            .catch(err => {
                console.error(err);
            });
        };
        getTeams();
    }, []);

    return (
        <div>
            <p>
                Champions League Standings
            <table>
                {groups.map((group) =>{
                    <MenuItem value={group.value}>{group.name}</MenuItem>
                })}
            </table>
            </p>
        </div>
    )
}

export default Standings;