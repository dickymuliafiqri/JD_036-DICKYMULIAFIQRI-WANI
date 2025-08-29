export default defineAppConfig({
  ui: {
    formField: {
      slots: {
        label: "title",
      },
    },
    input: {
      slots: {
        base: "border-2",
      },
    },
    textarea: {
      slots: {
        base: "border-2",
      },
    },
    inputTags: {
      slots: {
        base: "border-2",
      },
    },
    inputNumber: {
      slots: {
        base: "border-2",
      },
    },
    select: {
      slots: {
        base: "border-2",
      },
    },
    button: {
      slots: {
        base: "title",
      },
    },
    toast: {
      slots: {
        root: "border-2 border-black solid-shadow ring-none ring-0",
      },
    },
  },
});
