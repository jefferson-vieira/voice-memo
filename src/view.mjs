export default class View {
  /** @type {View} */
  static #INSTANCE;

  static #AUDIO_PLAYER_HIDDEN_CLASS_NAME = "hidden";

  /** @type {HTMLButtonElement} */
  #btnStart = document.getElementById("btnStart");

  /** @type {HTMLButtonElement} */
  #btnStop = document.getElementById("btnStop");

  /** @type {HTMLAudioElement} */
  #audioPlayer = document.getElementById("audioPlayer");

  static get INSTANCE() {
    return View.#INSTANCE || (View.#INSTANCE = new View());
  }

  configureStartRecordingButton(command) {
    this.#btnStart.addEventListener("click", this.#handleStartRecording(command));
  }

  configureStopRecordingButton(command) {
    this.#btnStop.addEventListener("click", this.#handleStopRecording(command));
  }

  playAudio(URL) {
    this.#audioPlayer.src = URL;
    this.#audioPlayer.muted = false;

    this.#audioPlayer.addEventListener("loadedmetadata", () => {
      this.#toggleAudioPlayer(true);
      this.#audioPlayer.play();
    });
  }

  #handleStartRecording(command) {
    return () => {
      command();
      this.#toggleAudioPlayer(false);
    };
  }

  #handleStopRecording(command) {
    return () => {
      command();
    };
  }

  #toggleAudioPlayer(visible) {
    this.#audioPlayer.classList[visible ? "remove" : "add"](View.#AUDIO_PLAYER_HIDDEN_CLASS_NAME);
  }
}
