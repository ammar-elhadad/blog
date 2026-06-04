// ============================================================================
// Site-wide config — EDIT THIS to make the blog yours.
// ============================================================================

export const SITE = {
  /** Brand shown in the header (latin). */
  name: 'saPWNa',
  /** Kanji shown next to the brand — 侍 = samurai, 浪人 = ronin, 道 = the way. */
  kanji: '侍',
  /** Big handle on the home hero. */
  handle: 'saPWNa',
  /** One-liner under the hero. */
  tagline:
    'Offensive security notes from the dojo — HTB & machine writeups, CTF challenges, CVE research, and field cheatsheets.',
  /** Used in <meta> + RSS. */
  description:
    'Penetration testing blog: HTB/machine writeups, CTF challenge writeups, CVE research, and security cheatsheets.',
  /** Default author for posts/RSS. */
  author: 'ammar',
  /** Footer + about links. Leave a value empty ('') to hide it. */
  socials: {
    github: 'https://github.com/ammar-elhadad',
    twitter: '',
    hackthebox: 'https://app.hackthebox.com/users/2445202',
    mastodon: '',
    email: 'mailto:ammarellhadad@gmail.com',
  },
} as const;

export type SectionKey = 'htb' | 'ctf' | 'cve' | 'notes';

// Order + metadata for the four content sections.
export const SECTIONS: Record<
  SectionKey,
  { label: string; kanji: string; href: string; blurb: string }
> = {
  htb: {
    label: 'Writeups',
    kanji: '攻',
    href: '/htb',
    blurb: 'Hack The Box & other machine writeups — recon to root.',
  },
  ctf: {
    label: 'CTF',
    kanji: '旗',
    href: '/ctf',
    blurb: 'Capture-the-flag challenge solutions by event and category.',
  },
  cve: {
    label: 'CVEs',
    kanji: '弱',
    href: '/cve',
    blurb: 'Vulnerability research, CVE analysis, and exploit breakdowns.',
  },
  notes: {
    label: 'Notes',
    kanji: '記',
    href: '/notes',
    blurb: 'Cheatsheets and quick references for the field.',
  },
};

export const NAV = [
  { label: 'Writeups', href: '/htb' },
  { label: 'CTF', href: '/ctf' },
  { label: 'CVEs', href: '/cve' },
  { label: 'Notes', href: '/notes' },
  { label: 'Tags', href: '/tags' },
  { label: 'whoami', href: '/about' },
];
