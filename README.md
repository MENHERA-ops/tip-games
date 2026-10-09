# Tip Games

MALICE arcade: a game-select lobby with two spin-to-tip games for the cosplay fund. Spinning is free; tips are optional and go through PayPal.

- `index.html` - lobby (pick a game)
- `slots.html` - Hime-sama Slots (amount x multiplier, + respins)
- `wheel.html` - Tip Wheel (copy of [tip-wheel](https://github.com/MENHERA-ops/tip-wheel))

Live at https://menhera-ops.github.io/tip-games/ once GitHub Pages is enabled (Settings > Pages > Deploy from branch `main`, root).

To embed in Carrd: add an Embed element (Code, Inline) and paste the contents of `carrd-embed.html`. The iframe resizes itself to fit whichever page is open.

To change the PayPal account, edit `PAYPAL_ID` in both `slots.html` and `wheel.html`.
