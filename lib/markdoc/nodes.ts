import { nodes as defaultNodes } from "@markdoc/markdoc";

export const nodes = {
  document: {
    ...defaultNodes.document,
  },
  paragraph: {
    ...defaultNodes.paragraph,
    render: "p",
  },
  heading: {
    ...defaultNodes.heading,
    render: (attributes: { level: number }) => `h${attributes.level}`,
  },
  list: {
    ...defaultNodes.list,
    render: (attributes: { ordered: boolean }) =>
      attributes.ordered ? "ol" : "ul",
  },
  item: {
    ...defaultNodes.item,
    render: "li",
  },
  code: {
    ...defaultNodes.code,
    render: "code",
  },
  fence: {
    ...defaultNodes.fence,
    render: "pre",
  },
};
