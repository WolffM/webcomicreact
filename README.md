# Web Comic React

A simple and customizable React app designed to host your webcomics.

## Live Demo

See it in action: [https://wolffm.github.io/webcomicreact/](https://wolffm.github.io/webcomicreact/)

## Features

- **Navigation:** Simple left/right arrow keys or on-screen buttons to move between pages.
- **Multiple Stories:** Easily organize your comics into different story arcs.
- **Dynamic Loading:** Fetches images as you navigate, optimizing for performance.
- **Customizable:** Add your own comics and titles with a few simple steps.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/wolffm/webcomicreact.git
   cd webcomicreact
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Add Your Comics:**
   - Create folders under `public/assets` for each story arc (e.g., `public/assets/AI-Arena`, `public/assets/Misc`).
   - Place your comic pages (numbered sequentially, e.g., `1.png`, `2.png`) in their respective folders.
   - Update the `storyList` variable in `src/App.js` with your story names.

4. **Run the App:**
   ```bash
   npm start
   ```
   This will open the app in your browser at `http://localhost:3000/`.

## Customization

- **Title:** Change the `<h1>` and `<h2>` text in `src/App.js`.
- **Styles:** Edit `src/App.css` to modify colors, fonts, and layout.
- **Image Limit:** Adjust `MAX_IMAGES` in `src/App.js` to control the maximum number of pages per story.
- **Navigation:** Customize the arrow buttons or add other navigation elements.

## Deployment

This project is configured to be deployed to GitHub Pages. If you'd like to do so, follow these steps:
1. Change the basename in `src/App.js` from `/webcomicreact/` to `/`
2. ```bash
   npm run deploy
   ```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
