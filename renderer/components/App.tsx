import React, { useState } from "react";
import { Setup } from "./Setup";
import { Dashboard } from "./Dashboard";

interface Props {}

const App = ({}: Props) => {
	const [ready, setReady] = useState(false);

	const handleReady = () => {
		setReady(true);
	};

	return <div>{ready ? <Dashboard /> : <Setup onReady={handleReady} />}</div>;
};

export { App };
