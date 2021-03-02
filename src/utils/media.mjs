export default class Media {
  /** @type {Media} */
  static #INSTANCE;

  static get INSTANCE() {
    return Media.#INSTANCE || (Media.#INSTANCE = new Media());
  }

  getAudio() {
    return navigator.mediaDevices.getUserMedia({
      audio: true,
    });
  }
}
