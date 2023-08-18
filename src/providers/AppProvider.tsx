import { createContext, useContext } from "react";
import { useSpeech } from "./SpeechProvider";
import AppProviderTypes from "../types/AppProviderTypes";

/**
 * Context for providing speech-to-text functionality.
 */
const Context = createContext({} as AppProviderTypes);

export function AppProvider({ children }: { children: React.ReactNode }) {
	/**
	 * Get the speech provider values
	 */
	const { isRecording, startRecording, stopRecording } = useSpeech();

	/**
	 * Handle the recording state.
	 */
	const handleRecordingState: AppProviderTypes["handleRecordingState"] = () => {
		if (isRecording) {
			stopRecording();
			return;
		}
		startRecording();
	};

	return (
		<Context.Provider value={{ handleRecordingState }}>
			{children}
		</Context.Provider>
	);
}

/**
 * Custom hook for accessing speech-to-text functionality from the context.
 * @returns {AppProvider} - Context values for speech-to-text functionality.
 */
export const useApp = () => useContext(Context);
