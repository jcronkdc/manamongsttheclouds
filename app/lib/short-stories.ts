export interface ShortStory {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  /** ISO date string */
  datePublished: string;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Whether the story is set in the MATC universe */
  inUniverse: boolean;
  /** Optional note about where/when this story fits in the world */
  worldContext?: string;
  /** The story content in HTML (paragraphs, em, hr, etc.) */
  content: string;
}

/**
 * All short stories, newest first.
 * To add a new story: push an entry here with its HTML content.
 */
export const shortStories: ShortStory[] = [
  // Placeholder — will be replaced with real story content shortly
];

export function getStoryBySlug(slug: string): ShortStory | undefined {
  return shortStories.find((s) => s.slug === slug);
}

export function getAllStorySlugs(): string[] {
  return shortStories.map((s) => s.slug);
}
