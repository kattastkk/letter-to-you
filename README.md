# Letter to You 💌

An interactive, Thai-language story for quiet self-reflection. You answer a few gentle questions, walk through a short dream, and at the end you receive a letter built from your own words.

The app says so on its second screen: it is a space to check in with yourself, not a psychological diagnosis.

Built with plain HTML, CSS and JavaScript. No framework, no build step.

## How it plays

1. **Opening.** A title screen, then a notice that the app is for reflection only and that you can stop at any time.
2. **About you.** It asks what to call you and how old you are.
3. **The dream.** You walk home, fall asleep, and find an animal waiting at a door. You pick a dog or a cat, then choose where to go to rest: the beach, the mountains, or a flower garden.
4. **At the place.** It asks why you chose it, then asks how you have been lately. Three answers: *happy*, *so-so*, *not so okay*.
5. **Your story.** Based on that answer, you get two short writing prompts. One asks what is on your mind these days. The other asks what you would say to someone else going through the same kind of time.
6. **The letter.** The scene walks through four frames of your chosen place to a red box. The animal drops a letter in, you wake up to a doorbell, and you open the letter. It is written from a template for your mood, with your name and your two answers filled in.

## Pages

| File | Screens | What it holds |
| --- | --- | --- |
| `index.html` | 18 | Intro, notice, name, age, the dream, choice of animal and place |
| `beach.html`, `mountain.html`, `garden.html` | 9 each | Arrival at the place, "why here?", mood question |
| `good.html`, `soso.html`, `sad.html` | 31 each | Two prompts, the dream scene, the letter, the closing |

Each page is a stack of `<section class="screen">` blocks. `script.js` shows one at a time by toggling an `active` class.

## Features

- Three mood paths with their own wording and their own letter
- A letter personalised with the visitor's name and answers
- Background music that fades in and out and resumes from the same spot on the next page
- A doorbell sound effect that briefly lowers the music
- Fade transitions between pages, with the next pages prefetched in the background
- Mobile first: full screen on phones with notch and home-indicator spacing handled, and a centred phone-shaped frame on screens 600px wide or more

## Tech

- HTML, CSS and vanilla JavaScript (`index.html`, `style.css`, `script.js`)
- Google Fonts: Anuphan and Noto Serif Thai
- JPEG illustrations and two MP3 files

## Your data

- Your name, age and written answers are stored in your browser's `localStorage`. They are not sent anywhere. They stay on the device until site data is cleared.
- One thing leaves the browser. When you pick how you have been lately, the app sends only the mood label (`good`, `soso` or `sad`) in a POST request to `https://gusapi-production.up.railway.app/api/feelings`. The request carries no name, age or text. If it fails, the app carries on as normal.

## Run it locally

You need a way to serve static files. Python works:

```bash
git clone https://github.com/kattastkk/letter-to-you.git
cd letter-to-you
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Browsers block audio until you interact with the page, so the music starts once you tap past the intro screens.

## Project structure

```
letter-to-you/
├── index.html            start of the story
├── beach.html            place pages
├── mountain.html
├── garden.html
├── good.html             mood pages (each ends with the letter)
├── soso.html
├── sad.html
├── script.js             screen switching, localStorage, audio, letters
├── style.css             layout, backgrounds, per-screen styling
├── bg-music.mp3          background music
├── doorbell.mp3          doorbell sound
└── *.jpeg                backgrounds and illustrations
```

## Notes for editing

- The place images follow the pattern `<place>-<1 to 4>.jpeg` (for example `beach-1.jpeg` to `beach-4.jpeg`). `script.js` builds those file names from the place the visitor picked, so renaming them breaks the dream scene.
- The three letter templates are in `fillLetterGood()`, `fillLetterSoso()` and `fillLetterSad()` in `script.js`.
- The answer to "why did you choose this place?" and the dog or cat choice are saved to `localStorage` but are not used in the letter yet.
