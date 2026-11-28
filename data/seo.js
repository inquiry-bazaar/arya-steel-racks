import { company } from "./content"

const SITE = "Arya Display Rack"

export const pageSeo = {
  blogs: {
    title: `Blogs | ${SITE}`,
    description:
      "Guides, tips and industry insights on supermarket display racks, shopping trolleys and retail store fit-outs from Arya Display Rack, New Delhi.",
  },
}

export function buildMetadata({ title, description }) {
  return {
    title,
    description,
    openGraph: { title, description, siteName: company?.name || SITE, type: "website" },
  }
}
