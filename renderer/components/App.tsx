import React, { useState } from "react";
import { Setup } from "./Setup";
import { Dashboard } from "./Dashboard";

const App: React.FC = () => {
	const [ready, setReady] = useState(false);

	const handleReady = () => {
		setReady(true);
	};

	return (
		<div className={"container"}>{ready ? <Dashboard /> : <Setup onReady={handleReady} />}</div>
	);
};

export { App };
