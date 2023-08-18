import { createContext, useContext, useState, useRef } from "react";
import SpeechProviderTypes from "../types/SpeechProviderTypes";

/**
 * Context for providing speech-related functionality.
 */
const Context = createContext({} as SpeechProviderTypes);

// We use 'any' type here since 'webkitSpeechRecognition' or 'SpeechRecognition' properties are not present in the Window type.
/**
 * Instance of webkitSpeechRecognition or SpeechRecognition.
 * @type {any}
 * @link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
 */
const recognitionInstance: any =
	(window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

export function SpeechProvider({ children }: { children: React.ReactNode }) {
	/**
	 * This reference holds a boolean value indicating whether recording is in progress or not.
	 */
	const isRecordRef = useRef(false);

	/**
	 * This reference holds the transcript of the recorded audio.
	 */
	const transcriptRef = useRef("");

	/**
	 * check either recording is start or not
	 */
	const [isRecording, setIsRecording] =
		useState<SpeechProviderTypes["isRecording"]>(false);
	const [isStopping, setIsStopping] = useState(false);

	/**
	 * Transcript of the recorded audio
	 */
	const [transcript, setTranscript] =
		useState<SpeechProviderTypes["transcript"]>("");
	const [interimTranscript, setInterimTranscript] =
		useState<SpeechProviderTypes["interimTranscript"]>("");

	/**
	 * Initiate the "window.webkitSpeechRecognition || window.SpeechRecognition" instance
	 */
	const recognition = new recognitionInstance();
	recognition.continues = true;
	recognition.interimResults = true;
	recognition.lang = "en-US";

	/**
	 * Event handler for speech recognition results.
	 * @param {any} event - The event containing recognition results.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent
	 */
	recognition.onresult = (event: any) => {
		let finalScript = "";
		let interimScript = "";
		for (let i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				finalScript += event.results[i][0].transcript + " ";
				transcriptRef.current = transcriptRef.current + finalScript;
				setTranscript(transcriptRef.current);
				setInterimTranscript("");
			} else {
				interimScript += event.results[i][0].transcript + " ";
				setInterimTranscript(interimScript);
			}
		}
	};

	/**
	 * Event handler for speech recognition ending.
	 */
	recognition.onend = () => {
		if (isRecordRef.current) {
			recognition.start();
		} else {
			transcriptRef.current = "";
			setTranscript("");
			setInterimTranscript("");
			setIsRecording(false);
			setIsStopping(false);
		}
	};

	/**
	 * This event handler is triggered when an error occurs during speech recognition.
	 * If the error is "not-allowed", it indicates that microphone permission is required.
	 * An alert is shown to the user informing them about the requirement and re-try to get the permission.
	 * Additionally, the error details are logged to the console.
	 *
	 * @param event - The SpeechRecognitionErrorEvent object that contains error details.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionErrorEvent
	 */
	recognition.onerror = (event: any) => {
		if (event.error === "not-allowed") {
			alert("Microphone permission is required to enable speech recognition.");
			requestMicrophonePermission();
		}

		if (event.error === "aborted") {
			recognition.start();
		}
		console.error("Speech Recognition Error:", event.error);
	};

	/**
	 * Starts the speech recording.
	 */
	const startRecording: SpeechProviderTypes["startRecording"] = () => {
		if (!isRecording) {
			recognition.start();
			isRecordRef.current = true;
			setIsRecording(true);
		}
	};

	/**
	 * Stops the speech recording.
	 */
	const stopRecording: SpeechProviderTypes["stopRecording"] = () => {
		if (isRecording) {
			setIsStopping(true);
			isRecordRef.current = false;
			recognition.stop();
		}
	};

	const requestMicrophonePermission = () => {
		navigator.mediaDevices.getUserMedia({ audio: true });
	};

	return (
		<Context.Provider
			value={{
				isStopping,
				transcript,
				interimTranscript,
				isRecording,
				startRecording,
				stopRecording,
			}}
		>
			{children}
		</Context.Provider>
	);
}

/**
 * Custom hook for accessing speech-related functionality from the context.
 * @returns {SpeechProvider} - Context values for speech-related functionality.
 */
export const useSpeech = () => useContext(Context);
