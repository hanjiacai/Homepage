# Homepage
Personal Academic Homepage of Jiacai Han

## Website

Buildless HTML and CSS for https://hanjiacai.github.io/Homepage/.
No framework, backend, analytics, external fonts, or JavaScript is needed by the page.

```text
index.html                 English profile and section content
assets/css/style.css       Responsive layout and appearance
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

- **Biography:** edit the paragraphs in `index.html` under `id="biography"`.
- **Research interests / education / work experience:** edit the corresponding sections in `index.html`. Dates, affiliations, and the master's field (Computer Technology) are owner-supplied. The formal doctoral field and specific master's degree type remain unverified and are not asserted. Keep the Biography consistent with these entries.
- **Portrait:** replace `assets/images/portrait.jpg` with your new approved photo. The page displays it using the `portrait` class. Check the desktop and mobile crop after replacing it.
- **Email:** update both the visible address and the `mailto:` target in Contact. The current address was supplied for publication by the owner.
- **ORCID:** currently hidden. Add a link at the header's ORCID comment only after confirming the real profile URL.
- **Publications:** manually maintained in `index.html` inside `<section id="publications">`. There is no automatic Google Scholar synchronization, scheduled fetch, or update workflow. Add a confirmed `article` using the template below, newest first. Titles link to DOI records; use full author names, bold Jiacai Han, and italicize the journal. The Google Scholar profile remains available in the header. Citation counts are omitted because they change. Add PDF/code links only when public sharing is permitted.
- **Projects / awards:** add a new `section` with a unique `id` and `h2`, then a matching navigation link. Include only confirmed, public information.

Publication template (not an actual publication; do not publish unfilled):

```html
<article class="publication">
  <h3><a href="CONFIRMED_PUBLICATION_URL">CONFIRMED_TITLE</a></h3>
  <p>CONFIRMED_AUTHORS_IN_ORDER</p>
  <p><em>CONFIRMED_VENUE</em>, CONFIRMED_YEAR.</p>
</article>
```

Use relative resource paths such as `assets/images/portrait.jpg`, not `/assets/...`.
The relative paths work at `/Homepage/` and in a local file preview.

## Publish with GitHub Pages

Review the local preview and approve the exact files before committing or pushing.
From this repository only:

```powershell
git status --short
git diff --check
git add -- index.html assets/css/style.css assets/images/favicon.svg assets/images/portrait.jpg .gitignore .nojekyll scripts/preview.mjs README.md
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
