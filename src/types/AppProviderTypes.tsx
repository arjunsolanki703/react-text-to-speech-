/**
 * Defines the shape of the AppProvider context, which provides speech-to-text functionality.
 */
export default interface AppProviderTypes {
	/**
	 * Handle the recording state.
	 * @function
	 * @returns {void}
	 * @description This function is responsible for toggling the recording state, i.e., starting or stopping the recording process.
	 */
	handleRecordingState: () => void;
}
