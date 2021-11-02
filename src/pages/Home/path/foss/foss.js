export default [
  {
    type: "multiplechoice",
    id: "foss",
    tagline:
      "Free apps don't need spyware and adds. Let's improve open source for everyone!",
    title: "What sort of apps do you want to support?",
    multiple: false,
    required: true,
    helpTextShow: false,
    options: [
      {
        label: "Mobile Apps",
        value: "mobile",
      },
      {
        label: "PC",
        value: "pc",
      },
      {
        label: "Services",
        value: "services",
      },
    ],
    jump: {
      _other: "_submit",
    },
    model: "",
  },
]
