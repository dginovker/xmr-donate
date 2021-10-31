export default [
  {
    type: "multiplechoice",
    id: "backend",
    tagline:
      "Backend development is why a 17-year old kid can build yesterday's Microsoft Suite in 6 hours.",
    title: "Which background projects do you want to support?",
    multiple: false,
    required: true,
    helpTextShow: false,
    options: [
      {
        label: "Monero",
        value: "monero",
      },
      {
        label: "Other",
        value: "other",
      },
    ],
    jump: {
      _other: "_submit",
    },
    model: "",
  },
]