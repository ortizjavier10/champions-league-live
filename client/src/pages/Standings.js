import React from 'react';
// const http = require("https");

// const options = {
// 	"method": "GET",
// 	"hostname": "heisenbug-champions-league-live-scores-v1.p.rapidapi.com",
// 	"port": null,
// 	"path": "/api/championsleague/table?group=H",
// 	"headers": {
// 		"x-rapidapi-key": "",
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


const Standings = () => {
    fetch("https://heisenbug-champions-league-live-scores-v1.p.rapidapi.com/api/championsleague/table?group=H", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "",
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