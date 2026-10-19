# Homepage
Personal Academic Homepage of Jiacai Han

## Website

Buildless HTML and CSS for https://hanjiacai.github.io/Homepage/.
No framework, backend, analytics, or external fonts. Two small local JavaScript files provide bilingual content and switching; the existing English HTML remains a fallback when JavaScript is unavailable.

```text
index.html                 Shared page structure and English fallback
assets/css/style.css       Responsive layout and appearance
assets/js/content.js       English / Chinese text and shared publication data
assets/js/language.js      Language selection, rendering, and persistence
assets/images/             Portrait and other approved public images
.nojekyll                  Serve static files without Jekyll processing
scripts/preview.mjs        Optional local preview (Node.js only)
```

## Preview locally

In PowerShell, with Node.js installed:

```powershell
Set-Location D:\PycharmProjects\Homepage
node scripts/preview.mjs
```

Open http://127.0.0.1:8000/Homepage/ and press Ctrl+C in the terminal to stop.
The preview deliberately tests the same `/Homepage/` subpath used by GitHub Pages.
You can also open `index.html` directly in a browser for a basic preview.
Check both desktop and mobile widths after edits.

## Update content

- **Biography:** edit `en.biographyParagraphs` and `zh.biographyParagraphs` in `assets/js/content.js`.
- **Research interests / education / work experience:** edit `en` and `zh` in `assets/js/content.js` (the `interests` arrays, school/college/role and date fields). The formal doctoral field and specific master's degree type remain unverified and are not asserted. Keep the Biography consistent with these entries.
- **Portrait:** replace `assets/images/portrait.jpg` with your new approved photo. The page displays it using the `portrait` class. Check the desktop and mobile crop after replacing it.
- **Email:** update both the visible address and the `mailto:` target in Contact. The current address was supplied for publication by the owner.
- **ORCID:** currently hidden. Add a link at the header's ORCID comment only after confirming the real profile URL.
- **Publications:** manually maintained in the shared `publications` array in `assets/js/content.js`. Add one object with `title`, `authors` (ordered array), `journal`, `volume`, `article`, `year`, and `doi`. Both languages use that same object and sort by year descending. There is no automatic Scholar synchronization. Official titles, author names, journals, DOI URLs, and email remain unchanged across languages.
- **Projects / awards:** add a new `section` with a unique `id` and `h2`, then a matching navigation link. Include only confirmed, public information.

The English markup below is the no-JavaScript fallback template only. Normal bilingual content is rendered from `content.js`; when maintaining a current no-JavaScript fallback is important, also update the corresponding English HTML. Do not maintain a second Chinese page.

```html
<article class="publication">
  <h3><a href="CONFIRMED_PUBLICATION_URL">CONFIRMED_TITLE</a></h3>
  <p>CONFIRMED_AUTHORS_IN_ORDER</p>
  <p><em>CONFIRMED_VENUE</em>, CONFIRMED_YEAR.</p>
</article>
```

## Language behavior and checks

- First visit defaults to English. An explicit valid `?lang=en` or `?lang=zh` wins over the saved preference; otherwise `localStorage` key `homepage-language` is used.
- Clicking EN / 中文 immediately translates content, updates HTML `lang`, title and description, saves the choice, and updates the query parameter while retaining other query parameters and the hash. Storage failures do not prevent switching.
- Only the owner's explicit button selection is saved. Opening a language-specific URL overrides the saved language for that visit without changing the preference.
- Use `http://127.0.0.1:8000/Homepage/?lang=zh#contact` to test a Chinese deep link. Test `?lang=en` too, click the buttons, refresh, then remove `lang` to verify persistence. An incognito window without a saved choice should start in English.
- After an explicitly approved deployment, repeat those checks at `https://hanjiacai.github.io/Homepage/`. No new Pages route or deployment configuration is required. JavaScript and CSS paths remain relative to `/Homepage/`.
- Verify both mobile and desktop widths, keyboard button activation, email, DOI links, and Scholar/GitHub entries. Scripts can be syntax checked with `node --check assets/js/content.js` and `node --check assets/js/language.js`.
- The romanized owner name is retained in both languages; no unconfirmed Chinese personal name or translated publication title is invented.

Use relative resource paths such as `assets/images/portrait.jpg`, not `/assets/...`.
The relative paths work at `/Homepage/` and in a local file preview.

## Publish with GitHub Pages

Review the local preview and approve the exact files before committing or pushing.
From this repository only:

```powershell
git status --short
git diff --check
git add -- index.html assets/css/style.css assets/js/content.js assets/js/language.js assets/images/favicon.svg assets/images/portrait.jpg .gitignore .nojekyll scripts/preview.mjs README.md
git diff --cached --stat
git commit -m "Create academic homepage for Jiacai Han"
git push origin main
```

Add future portrait or other files explicitly; avoid `git add .` if unrelated files exist.
If Git on Windows reports `schannel: AcquireCredentialsHandle failed`, a per-command alternative is `git -c http.sslBackend=openssl push origin main`; this does not change global Git configuration. Authentication may still be required.

In https://github.com/hanjiacai/Homepage/settings/pages:

1. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
2. Select **main** and **/ (root)**, then **Save**.
3. Check the repository **Actions** tab for a successful Pages deployment.
4. Open https://hanjiacai.github.io/Homepage/ and verify the stylesheet, navigation, mobile layout, and academic links.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

After future edits, preview, review, commit the intended files, and push to `main`; the configured Pages source publishes subsequent pushes automatically.
Do not add private contact details, datasets, credentials, unpublished results, or research project source code to this public repository.

## Design and content boundaries

The original README title and description above are preserved. The page uses an original implementation of a simple academic layout, with the reference homepage used for general structural inspiration only. No reference-site code, photos, or publication content is included.
The portrait, email, affiliations, master's study history, faculty employment history, and two publication entries were supplied by the owner for this homepage. ORCID remains pending. Both publication titles and DOI identifiers were checked against the ScienceDirect publisher records (S2352710224031619 and S0045790624005585). The first paper retains its 2025 volume year even though its DOI contains 2024. No citation count or unspecified degree type is claimed. Local IDE metadata is ignored and should not be published.
