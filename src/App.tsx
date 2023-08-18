import { SpeechProvider } from "./providers/SpeechProvider";
import { AppProvider } from "./providers/AppProvider";
import RecordAction from "./components/RecordAction";
import RecordedText from "./components/RecordedText";

/**
 * The main component of the application.
 * @returns {JSX.Element} The JSX element representing the main App component.
 */
export default function App() {
	return (
		<main className="container">
			{/* Wrap components with providers */}
			<SpeechProvider>
				<AppProvider>
					{/* Display the recorded text */}
					<RecordedText />
					{/* Display the recording action button */}
					<RecordAction />
				</AppProvider>
			</SpeechProvider>
		</main>
	);
}
