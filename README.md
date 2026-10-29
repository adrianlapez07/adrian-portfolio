# Adrian Lapez — Personal Portfolio

A responsive student portfolio built with **HTML5, CSS3, and vanilla JavaScript**. It uses a dark navy, black, gray, and blue palette and includes responsive navigation, scroll reveals, desktop pointer effects, project placeholders, and a contact form that can prepare an email draft.

> **Before publishing:** replace the sample project cards, portrait placeholder, skills, journey milestones, and contact details with information Adrian confirms. The project cards are placeholders, not claims of completed work.

## Project structure

```text
adrian-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── README.md
└── README.md
```

## Run in Visual Studio Code

1. Extract the project ZIP to a folder you can find easily.
2. Open Visual Studio Code.
3. Choose **File → Open Folder…** and select `adrian-portfolio`.
4. In the Extensions panel, search for **Live Server** by Ritwick Dey and install it.
5. Open `index.html`, right-click in the editor, then choose **Open with Live Server**.
6. The portfolio should open in your browser. Save changes in VS Code and Live Server will refresh the page.

You can also open `index.html` directly in a browser for a quick preview, but Live Server is more convenient while editing.

## Add Adrian's portrait

1. Put a portrait image inside `images/`, for example `adrian-profile.jpg`.
2. In `index.html`, find the `.portrait-frame` block in the hero section.
3. Replace the inner `.portrait-placeholder` element with:

   ```html
   <img class="portrait-image" src="images/adrian-profile.png" alt="Portrait of Adrian Lapez">
   ```

4. Add this CSS rule to `css/style.css`:

   ```css
   .portrait-image {
     width: 100%;
     height: 100%;
     object-fit: cover;
     object-position: center;
     display: block;
     border: 1px solid #3c5b85;
   }
   ```

Use a clear image that Adrian has permission to publish. Keep the filename and path exactly the same, including capitalization.

## Customize the content

- **Introduction/About:** edit the text in `index.html`; remove any wording that does not describe Adrian.
- **Skills:** retain only technologies he uses or is learning. Do not add proficiency percentages unless he has a meaningful basis for them.
- **Projects:** replace each placeholder title, description, tags, and link with a real project. Update each `href` to the correct URL and remove the `placeholder-link` class and `data-placeholder` attribute from real links.
- **Journey:** replace sample milestones with confirmed dates and experiences.
- **Colors:** edit the CSS custom properties at the top of `css/style.css`.
- **Email:** in `js/script.js`, set `ADrian_EMAIL` to Adrian's confirmed email address. The form validates input and opens the visitor's email app; it does not send messages through a server. For direct website submissions, connect a trusted form service or backend and configure it before claiming messages are delivered.
- **Social links:** add only real profiles Adrian wants to share.

## Test checklist

- [ ] Navigation links scroll to the right sections.
- [ ] Mobile menu opens, closes, and closes after selecting a section.
- [ ] Active navigation state updates while scrolling.
- [ ] Intro and section reveal effects work without hiding content permanently.
- [ ] Custom cursor and mouse spotlight work on a desktop pointer and do not block clicks.
- [ ] Portrait parallax returns to its original position when the pointer leaves.
- [ ] Effects are reduced/disabled when `prefers-reduced-motion` is enabled or on touch devices.
- [ ] Contact form flags empty fields and invalid email formats.
- [ ] Real email address is configured before testing the email action.
- [ ] Placeholder project links are replaced before launch.
- [ ] Test at approximately 360px, 390px, 768px, 1024px, and desktop widths.
- [ ] No horizontal scrolling, missing images, or browser console errors.
- [ ] Keyboard users can reach links, buttons, and form fields with visible focus outlines.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `adrian-portfolio`.
2. Upload the contents of this folder (the `index.html` file should be at the repository root, not inside an extra nested folder).
3. In the repository, open **Settings → Pages**.
4. Under the build/deployment source, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for the published URL shown in the Pages section. Revisit it and test the live version.

## Publish with Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In the Cloudflare dashboard, open **Workers & Pages** and create a Pages project connected to the repository.
3. For a plain HTML/CSS/JS site, leave the build command empty and set the output directory to the folder containing `index.html` (usually `/` or the project root, depending on the setup screen).
4. Deploy and test the provided URL on desktop and mobile.

## Notes

- No framework, build step, or package installation is required.
- Google Fonts are loaded from the internet; system fallback fonts are provided.
- Check keyboard focus, contrast, form behavior, and all real links before sharing the site publicly.


## Animated FluxLines-style hero background

The home hero includes a lightweight, vanilla-JavaScript canvas effect inspired by React Bits' FluxLines. It uses blue/white flowing lines, subtle pointer distortion, and a click ripple. It was adapted to preserve this project's original HTML/CSS/vanilla-JavaScript stack; it does not require React or a build step. The effect respects `prefers-reduced-motion`. Edit `js/flux-lines.js` to adjust line colors, density, glow, and motion.
