/**
 * Defines the shape of the SpeechProvider context, which provides speech-related functionality.
 */
export default interface SpeechProviderTypes {
	/**
	 * The transcript of the recorded voice.
	 * @type {string}
	 * @description This property holds the transcribed text generated from the recorded audio.
	 */
	transcript: string;

	/**
	 * The interim-transcript of the recorded voice.
	 * @type {string}
	 * @description This property holds the interim-transcribed text generated from the recorded audio.
	 */
	interimTranscript: string;

	/**
	 * Indicates whether recording is currently active.
	 * @type {boolean}
	 * @description This property reflects whether the microphone is actively recording or not.
	 */
	isRecording: boolean;

	/**
	 * Indicates whether recording is stopping.
	 * @type {boolean}
	 * @description This property reflects whether the microphone is going stopped or not.
	 */
	isStopping: boolean;

	/**
	 * Start the speech recording.
	 * @function
	 * @returns {void}
	 * @description This function initiates the recording process by invoking the underlying "recognition.start()" function and requesting microphone permissions.
	 */
	startRecording: () => void;

	/**
	 * Stop the speech recording.
	 * @function
	 * @returns {void}
	 * @description This function stops the ongoing recording by invoking the underlying "recognition.stop()" function.
	 */
	stopRecording: () => void;
}
