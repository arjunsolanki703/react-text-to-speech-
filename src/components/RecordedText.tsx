import { useSpeech } from "../providers/SpeechProvider";

/**
 * Component that displays the recorded transcript text.
 */
export default function RecordedText() {
	/**
	 * Get the transcript string and recording state.
	 */
	const { transcript, interimTranscript, isRecording } = useSpeech();

	return isRecording || transcript ? (
		<p className="large blinking-cursor">
			{transcript} <span className="text-dark-gray">{interimTranscript}</span>
		</p>
	) : (
		<p className="text-dark-gray large">
			Transcript of voice will show here...
		</p>
	);
}
