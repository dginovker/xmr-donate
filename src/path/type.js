import foss from "./foss/foss";
import advocacy from "./advocacy/advocacy";
import backend from "./backend/backend";

export default [
  {
    type: "multiplechoice",
    id: "project_type",
    tagline:
      "Giving is an attitude. It is not dependent on the amount of money in your bank account. It’s a heart issue.", // todo - randomly generate from pro-donation list - "Ready brighten everyone in the world's day in 4 minutes?"
    title: "What sort of project would you like to support today?",
    multiple: false,
    required: true,
    helpTextShow: false,
    options: [
      {
        label: "Free and Open Source Software",
        value: "foss",
      },
      {
        label: "Behind the Scenes",
        value: "backend",
      },
      {
        label: "Advocacy Groups",
        value: "advocacy",
      },
    ],
    jump: {
      foss: "foss",
      // behind_the_scenes: "behind_the_scenes",
      // linux: "linux",
    },
    model: "",
  },
  ...foss,
  ...advocacy,
  ...backend
];