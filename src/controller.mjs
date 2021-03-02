export default class Controller {
  /** @type {Controller} */
  static #INSTANCE;

  #view;

  #media;

  #recorder;

  constructor({ view, media, recorder }) {
    this.#view = view;
    this.#media = media;
    this.#recorder = recorder;
  }

  static initialize(dependencies) {
    return (Controller.#INSTANCE = new Controller(dependencies)).#init();
  }

  #init() {
    this.#view.configureStartRecordingButton(this.#onStartRecording.bind(this));
    this.#view.configureStopRecordingButton(this.#onStopRecording.bind(this));
  }

  async #onStartRecording() {
    const audioStream = await this.#media.getAudio();
    this.#recorder.startRecording(audioStream);
  }

  #onStopRecording() {
    this.#recorder.stopRecording();

    setTimeout(() => {
      const audioURL = this.#recorder.getRecordingURL();
      this.#view.playAudio(audioURL);
    });
  }
}
