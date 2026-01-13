# SolveSolo

[![Get it on Firefox](https://img.shields.io/badge/Get%20it%20on-Firefox-FF7139?style=for-the-badge&logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/solvesolo/)

SolveSolo is a browser extension designed to help developers practice Data Structures and Algorithms (DSA) independently by blocking access to AI assistance tools and distractions during problem-solving sessions.

## Description

The extension automatically activates a "Focus Mode" when you visit supported coding platforms. During this mode, access to AI chatbots and optionally YouTube is restricted for a set duration, encouraging you to solve problems without external help. If you submit a wrong answer on supported platforms, the extension can apply a "Penalty Mode," extending the block duration to enforce independent debugging.

## Features

* **Automatic Focus Timer:** Detects when you visit problem pages on LeetCode or GeeksforGeeks and starts a blocking timer.
* **AI Blocking:** Restricts access to major AI tools including ChatGPT, Claude, Gemini, DeepSeek, Perplexity, and others during the focus period.
* **Penalty System:** Detects "Wrong Answer," "Compilation Error," or "Time Limit Exceeded" on GeeksforGeeks and LeetCode and adds a penalty duration to the timer.
* **Customizable Settings:** Users can configure the block duration (default 20 minutes) and the penalty duration (default 5 minutes) via the options page.
* **YouTube Blocking:** Optional setting to block YouTube during focus sessions.
* **Access Denied Redirect:** Attempts to access blocked sites redirect to a specific "Access Denied" page with a button to return to the coding problem.

## Screenshots

![Initial Blocker that starts everytime you open a question](store_assets/pic1.png)
![Options page to customize your blocking settings](store_assets/pic2.png)
![Penalty timers that encourages you to debug your error with AI assistance](store_assets/pic3.png)
![Works with both LeetCode and GeeksForGeeks!](store_assets/pic4.png)
![Opening all major LLMs redirect to this](store_assets/pic5.png)

## Supported Platforms

The extension triggers Focus Mode on the following domains:
* LeetCode
* GeeksforGeeks

## Blocked Domains

The following domains are inaccessible during an active session:
* chatgpt.com
* claude.ai
* gemini.google.com
* deepseek.com
* perplexity.ai
* copilot.microsoft.com
* qwen.ai
* mistral.ai
* meta.ai
* grok.com
* ai.baidu.com
* youtube.com (Optional)

## Installation 

You can install SolveSolo directly from the Firefox Add-ons Store:

**[Download SolveSolo for Firefox](https://addons.mozilla.org/en-US/firefox/addon/solvesolo/)**

## Configuration

To adjust the extension settings:

1.  Click the extension icon in the browser toolbar.
2.  Click the Settings (gear) button in the popup.
3.  You can modify the following:
    * **Block Duration:** Set the length of the focus session in minutes (Min: 15, Max: 120).
    * **Incorrect Testcase Penalty:** Set the time added for failed submissions (Min: 0, Max: 30).
    * **Block YouTube:** Toggle whether YouTube should also be blocked.
4.  Click "Save Settings" to apply changes.

## Permissions

* **tabs:** Required to monitor current URLs and detect when the user visits trigger domains or blocked sites.
* **storage:** Required to save user preferences for timers and blocked status.
* **alarms:** Used for managing time-based events.
* **Host Permissions:** Access to `*.leetcode.com` and `*.geeksforgeeks.org` is required to inject content scripts for error detection.
