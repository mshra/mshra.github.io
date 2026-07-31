import "@fontsource-variable/newsreader/opsz.css";
import "./style.css";

const controls = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".audio-control"),
);

const resetControl = (control: HTMLButtonElement) => {
  const label = control.querySelector<HTMLElement>(".audio-control__label");
  const icon = control.querySelector<HTMLElement>(".audio-control__icon");

  control.setAttribute("aria-pressed", "false");
  if (label) label.textContent = "Play";
  if (icon) icon.textContent = "▶";
};

const resetOtherPlayers = (activeAudio: HTMLAudioElement) => {
  controls.forEach((control) => {
    const audioId = control.dataset.audio;
    const audio = audioId
      ? document.querySelector<HTMLAudioElement>(`#${audioId}`)
      : null;

    if (!audio || audio === activeAudio) return;
    audio.pause();
    audio.currentTime = 0;
    resetControl(control);
  });
};

controls.forEach((control) => {
  const audioId = control.dataset.audio;
  const audio = audioId
    ? document.querySelector<HTMLAudioElement>(`#${audioId}`)
    : null;
  const label = control.querySelector<HTMLElement>(".audio-control__label");
  const icon = control.querySelector<HTMLElement>(".audio-control__icon");

  if (!audio || !label || !icon) return;

  control.addEventListener("click", async () => {
    if (audio.paused) {
      resetOtherPlayers(audio);

      try {
        await audio.play();
        control.setAttribute("aria-pressed", "true");
        label.textContent = "Pause";
        icon.textContent = "Ⅱ";
      } catch {
        label.textContent = "Unable to play";
      }
    } else {
      audio.pause();
      resetControl(control);
    }
  });

  audio.addEventListener("ended", () => resetControl(control));
});
