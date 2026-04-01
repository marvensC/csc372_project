

import React from "react";

function ZodiacGrid({ zodiacSigns, onSelectSign }) {
	return (
		<div className="zodiac-grid">
			{zodiacSigns.map(sign => (
				<div
					className="zodiac-card"
					key={sign.id}
					onClick={() => onSelectSign(sign)}
					style={{ cursor: "pointer" }}
				>
					<img src={sign.image} alt={sign.name} />
					<h3>{sign.name}</h3>
					<p>{sign.range}</p>
				</div>
			))}
		</div>
	);
}

export default ZodiacGrid;