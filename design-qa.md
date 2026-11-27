# Design QA — Sonzera Beer Pub clone

## Checks

- Desktop render opened at `http://localhost:4173/` and visually compared with the captured source.
- Local assets load from `assets/` without hotlinked source images.
- Header anchors navigate to `#o-pub`, `#cervejas`, `#agenda`, `#blog`, and `#contato`.
- External cardápio, Instagram, blog, telefone, e-mail, and Spotify links remain actionable.
- Responsive rules provide a single-column mobile layout and collapsible navigation under 800px.
- Playlist rows have an interactive active state.
- The local server remains running for inspection.
- Beer cards keep the real beer photography and use hover/focus states with a per-style color fill overlay; no beer modal is used.
- The gallery contains six local images and opens an accessible modal with previous/next controls, caption, Escape, and arrow-key support.
- Pet and music banners preserve the source artwork aspect ratio on desktop so their text and subjects are not cropped.
- Sections keep their color blocks fixed with no entrance translation; individual resources use a restrained fade-up as progressive enhancement.
- Agenda uses the official Spotify embed URL from the source page rather than a recreated player UI.
- `blog.html` loads its cards from `blog-data.json`, which can be replaced by an App Script update later.

## Notes

- The original hero artwork already includes the “Happy Hour é no Sonzera!” lettering, so the clone uses the local hero asset without duplicating that text.
- Added the source gallery, hop illustration, agenda image, delivery artwork, and local icon fonts from the captured page.
- Updated the accent token to `#C8951D`.

final result: passed
