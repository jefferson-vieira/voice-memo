import Controller from "./controller.mjs";
import Media from "./utils/media.mjs";
import Recorder from "./utils/recorder.mjs";
import View from "./view.mjs";

Controller.initialize({
  view: View.INSTANCE,
  media: Media.INSTANCE,
  recorder: Recorder.INSTANCE,
});
