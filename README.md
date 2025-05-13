🎹 HotkeyHero

HotkeyHero is a rhythm-based typing game that helps you practice keyboard symbols like arrow keys, Enter, Space, letters, and numbers. It’s great for improving symbol recognition and reaction speed, and it’s fully customizable through an intuitive in-browser UI.
🕹️ Demo

Hosted on hotkeyhero.com
Feel free to check it out and leave feedback

✨ Features

    🎯 Practice with common keys: ←, ↑, ↓, →, ⏎, ⌫, ␣, A–Z, and 0–9

    ⚙️ Adjustable spawn rate and symbol speed via sliders

    ✅ Enable/disable specific symbols through the menu

    🧠 Tracks score and misses

    ⏸️ Pause/resume gameplay

    🧹 Clear/reset game instantly

    🖱️ Simple, clean, and responsive interface


🚀 Getting Started
1. Clone the Repository

git clone https://github.com/zakkayyy/hotkeyHero.git
cd hotkeyHero
2. Open in Browser

Just open index.html in your browser.

Alternatively, serve it locally with a static server:

npx serve .
or use the “Live Server” extension in VS Code


🧩 How to Play

    Press the correct key as the falling symbol reaches the bar.

    Use the sliders to adjust:

        Spawn Rate (milliseconds between new symbols)

        Symbol Speed (pixels per frame)

    Click the Menu button to toggle which symbols are active.

    Use Pause to stop/resume gameplay.

    Use Clear to reset the game and score.
    

⚙️ Customization

Want to tweak the behavior? Open app.js and modify these:

    let spawnInterval = 500; → default delay between spawns

    let symbolSpeed = 2.9; → default speed of symbols

    const defaultSymbols = [...] → default active symbol list

To map more keys or symbols, edit the keyMap object near the top of the script.


🧪 Technologies Used

    HTML5 + CSS3

    JavaScript (ES6+)

    Canvas API
    

🧑‍💻 Contributing

Contributions are welcome! Here's how:

    Fork this repo

    Create a new branch: git checkout -b feature/YourFeature

    Commit changes: git commit -m 'Add your message here'

    Push the branch: git push origin feature/YourFeature

    Open a Pull Request

📄 License

This project is licensed under the MIT License.
Feel free to reuse, modify, and share with credit.


🙌 Acknowledgements

Built with ❤️ to help people improve keyboard skills, timing, and recognition of special keys. Inspired by rhythm games and typing trainers.
