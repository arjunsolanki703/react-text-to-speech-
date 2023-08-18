import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faStop } from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../providers/AppProvider";
import { useSpeech } from "../providers/SpeechProvider";

/**
 * Component that displays the recording action button.
 */
export default function RecordAction() {
	/**
	 * State indicating whether recording is started or not.
	 */
	const { isRecording, isStopping } = useSpeech();

	/**
	 * Function to handle recording state.
	 */
	const { handleRecordingState } = useApp();

	return (
		<div className="action-bar">
			<p className="text-gray">
				Press here to {isRecording ? "stop" : "start"}
			</p>
			<button
				className={`action-button ${isRecording && "animation-none"}`}
				onClick={handleRecordingState}
			>
				{isStopping ? (
					<FontAwesomeIcon icon={faCircleNotch} spin />
				) : isRecording ? (
					<FontAwesomeIcon icon={faStop} />
				) : (
					<FontAwesomeIcon icon={faMicrophone} />
				)}
			</button>
		</div>
	);
}
