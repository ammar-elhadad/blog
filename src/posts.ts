import { getCollection, type CollectionEntry } from 'astro:content';
import type { SectionKey } from './consts';

export type AnyEntry =
  | CollectionEntry<'htb'>
  | CollectionEntry<'ctf'>
  | CollectionEntry<'cve'>
  | CollectionEntry<'notes'>;

export interface NormalizedPost {
  section: SectionKey;
  id: string;
  url: string;
  data: AnyEntry['data'];
}

const isPublished = (e: { data: { draft?: boolean } }) =>
  import.meta.env.PROD ? !e.data.draft : true;

const byDate = (a: NormalizedPost, b: NormalizedPost) =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

/** Normalize a single collection into NormalizedPost[]. */
export async function getSectionPosts(section: SectionKey): Promise<NormalizedPost[]> {
  const entries = (await getCollection(section as any)) as AnyEntry[];
  return entries
    .filter(isPublished)
    .map((e) => ({ section, id: e.id, url: `/${section}/${e.id}`, data: e.data }))
    .sort(byDate);
}

/** Raw, renderable collection entries for a section — filtered + newest first. */
export async function getSortedEntries(section: SectionKey): Promise<AnyEntry[]> {
  const entries = (await getCollection(section as any)) as AnyEntry[];
  return entries
    .filter(isPublished)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** All posts across every section, newest first. */
export async function getAllPosts(): Promise<NormalizedPost[]> {
  const sections: SectionKey[] = ['htb', 'ctf', 'cve', 'notes'];
  const lists = await Promise.all(sections.map(getSectionPosts));
  return lists.flat().sort(byDate);
}

/** Difficulty/severity pill for a post, if any. */
export function pillFor(
  post: NormalizedPost,
): { kind: 'level' | 'sev'; value: string } | undefined {
  const d = post.data as any;
  if ((post.section === 'htb' || post.section === 'ctf') && d.difficulty)
    return { kind: 'level', value: d.difficulty };
  if (post.section === 'cve' && d.severity) return { kind: 'sev', value: d.severity };
  return undefined;
}
