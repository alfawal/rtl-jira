

# RTL Jira

A lightweight Chrome extension that provides seamless **Right-to-Left (RTL)** support for Atlassian products, including **Jira** and **Confluence**. Automatically adjusts text direction and alignment for issue summaries, titles, backlog cards, tables, code blocks, mentions, and more.

## ✨ Features
- 🔄 **Multiple Direction Modes:** Toggle between `RTL`, `LTR`, `Auto`, or `Off` instantly
- 🎯 **Smart Targeting:** Automatically styles key Atlassian UI components out-of-the-box
- ⚡ **Real-time Updates:** Uses `MutationObserver` to apply styles to dynamically loaded content without refreshing
- 📌 **Visual Badge:** Extension icon displays the first letter of the active mode (`R`, `L`, `A`, `O`)
- 🔒 **Privacy-First:** Runs entirely in-browser with no external telemetry or analytics

## 📦 Installation

### Chrome Web Store (Recommended)
Click here to install: [RTL Jira on Chrome Web Store](https://chromewebstore.google.com/detail/rtl-jira/hginkadmmbneamgflaflgecjlgkopeck)

### Manual / Developer Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/alfawal/rtl-jira.git
   cd rtl-jira
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** in the top-right corner
4. Click **Load unpacked** and select the `rtl-jira` directory

## 🛠️ Usage
1. Navigate to any Atlassian workspace (`*.atlassian.net`)
2. Click the **RTL Jira** extension icon in your browser toolbar
3. Select your preferred mode from the popup:
   - **RTL:** Forces right-to-left direction and start alignment for targeted elements
   - **LTR:** Forces left-to-right direction with isolated bidirectional text for code blocks, cards, and mentions
   - **Auto:** Delegates direction handling to the browser's native auto-detection
   - **Off:** Disables all styling modifications
4. Changes apply instantly. The extension badge will update to reflect your selection.

## 🤝 Support & Contributing
- 🐛 Report bugs or request features: [GitHub Issues](https://github.com/alfawal/rtl-jira/issues)
- ⭐ Leave a review: [Chrome Web Store Reviews](https://chromewebstore.google.com/detail/rtl-jira/hginkadmmbneamgflaflgecjlgkopeck/reviews)
- 🌟 Star the repository if this extension improves your workflow!

---
*Made by [Alfawal](https://alfawal.dev) | Version 1.2*
