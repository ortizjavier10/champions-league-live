import React from 'react';
// const http = require("https");

// const options = {
// 	"method": "GET",
// 	"hostname": "heisenbug-champions-league-live-scores-v1.p.rapidapi.com",
// 	"port": null,
// 	"path": "/api/championsleague/table?group=H",
// 	"headers": {
// 		"x-rapidapi-key": "4f7cb9b07amshdac9e3deb18b036p16ef7djsn8d936f07a19f",
// 		"x-rapidapi-host": "heisenbug-champions-league-live-scores-v1.p.rapidapi.com",
// 		"useQueryString": true
// 	}
// };

// const req = http.request(options, function (res) {
// 	const chunks = [];

// 	res.on("data", function (chunk) {
// 		chunks.push(chunk);
// 	});

// 	res.on("end", function () {
// 		const body = Buffer.concat(chunks);
// 		console.log(body.toString());
// 	});
// });

// req.end();
// const API_KEY = '4f7cb9b07amshdac9e3deb18b036p16ef7djsn8d936f07a19f';
// const API_HOST = 'heisenbug-champions-league-live-scores-v1.p.rapidapi.com'

const Standings = () => {
    fetch("https://heisenbug-champions-league-live-scores-v1.p.rapidapi.com/api/championsleague/table?group=H", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4f7cb9b07amshdac9e3deb18b036p16ef7djsn8d936f07a19f",
		"x-rapidapi-host": "heisenbug-champions-league-live-scores-v1.p.rapidapi.com"
	}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.error(err);
    });


    return (
        <div>
            <p>
                Champions League Standings
            </p>
        </div>
    )
}

export default Standings;