# Tip Games

MALICE arcade: a game-select lobby with two spin-to-tip games for the cosplay fund. Spinning is free; tips are optional and go through PayPal.

- `index.html` - lobby (pick a game)
- `slots.html` - Hime-sama Slots (amount x multiplier, + respins)
- `wheel.html` - Tip Wheel (copy of [tip-wheel](https://github.com/MENHERA-ops/tip-wheel))
- `hand.html` - Expansion 01: Hime's Hand (3 cards + a charm, tip $ × mult)
- `auction.html` - Expansion 02: Hime's Auction (piggies bid against each other)

Live at https://menhera-ops.github.io/tip-games/ once GitHub Pages is enabled (Settings > Pages > Deploy from branch `main`, root).

To embed in Carrd: add an Embed element (Code, Inline) and paste the contents of `carrd-embed.html`. The iframe resizes itself to fit whichever page is open.

To change the PayPal account, edit `PAYPAL_ID` in `shared.js`.

Tests: `node --test`
