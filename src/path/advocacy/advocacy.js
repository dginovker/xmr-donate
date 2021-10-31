export default [
  {
    type: "multiplechoice",
    id: "advocacy",
    tagline:
      "You only know of the best products because someone mentioned it, somewhere",
    title: "What sort of advocate do you want to support?",
    multiple: false,
    required: true,
    helpTextShow: false,
    options: [
      {
        label: "FOSS advocate",
        value: "foss",
      },
      {
        label: "Monero advocate",
        value: "monero"
      },
      {
        label: "Privacy advocate",
        value: "privacy"
      }
    ],
    jump: {
      _other: "_submit",
    },
    model: "",
  }
]
