export default class Recorder {
  /** @type {Recorder} */
  static #INSTANCE;

  #audioType = "audio/webm;codecs=opus";

  /** @type {MediaRecorder} */
  #mediaRecorder;

  /** @type {Blob[]} */
  #recordedAudioBlobParts = [];

  static get INSTANCE() {
    return Recorder.#INSTANCE || (Recorder.#INSTANCE = new Recorder());
  }

  startRecording(audioStream) {
    this.#clearPreviousRecordedAudio();

    const options = this.#setup();

    this.#mediaRecorder = new MediaRecorder(audioStream, options);

    this.#mediaRecorder.onstart = () => {
      console.log("[recording started]", this.#mediaRecorder);
    };

    this.#mediaRecorder.ondataavailable = (event) => {
      if (!event.data || !event.data.size) return;

      this.#recordedAudioBlobParts.push(event.data);
    };

    this.#mediaRecorder.onstop = () => {
      console.log("[recording stopped]", this.#recordedAudioBlobParts);
    };

    this.#mediaRecorder.start();
  }

  stopRecording() {
    if (this.#mediaRecorder.state === "inactive") return;

    this.#mediaRecorder.stop();
  }

  getRecordingURL() {
    const recordedAudioBlob = new Blob(this.#recordedAudioBlobParts, {
      type: this.#audioType,
    });

    return URL.createObjectURL(recordedAudioBlob);
  }

  #setup() {
    const options = { mimeType: this.#audioType };

    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      const msg = `the codec ${options.mimeType} isn't supported!`;
      alert(msg);
      throw new Error(msg);
    }

    return options;
  }

  #clearPreviousRecordedAudio() {
    this.#recordedAudioBlobParts = [];
  }
}
