export const tags = {
  callout: {
    render: 'Callout',
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning', 'error'],
      },
    },
  },
}
