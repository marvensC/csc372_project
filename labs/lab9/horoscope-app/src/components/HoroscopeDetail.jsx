import React from "react";

function HoroscopeDetail({ sign }) {
	if (!sign) return null;

	return (
		<div className="horoscope-detail">
			<img src={sign.image} alt={sign.name} />
			<h2>{sign.name}</h2>
			<p>{sign.range}</p>

			<div className="ratings">
				<h3>Today's Ratings:</h3>
				<p>Mood: {"★".repeat(sign.mood)}</p>
				<p>Success: {"★".repeat(sign.success)}</p>
				<p>Love: {"★".repeat(sign.love)}</p>
			</div>

			<div className="horoscope-text">
				<h3>Today's Horoscope:</h3>
				<p>{sign.horoscope}</p>
			</div>
		</div>
	);
}

export default HoroscopeDetail;
