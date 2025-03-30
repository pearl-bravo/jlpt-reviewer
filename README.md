# JLPT Reviewer

## Description

JLPT Reviewer is a personal project designed to assist fellow 日本語学生 (Japanese language learners) in reviewing lessons and preparing for the Japanese-Language Proficiency Test (JLPT). This tool aims to provide an efficient and interactive way to study by allowing users to review vocabulary, kanji, grammar, and more through quizzes. The system uses simple CSV files containing lesson data, which can be easily customized to fit the needs of any JLPT level. With the integration of hints and example sentences, learners can better understand the material and retain it effectively. Whether you're reviewing basic hiragana or tackling complex kanji characters, this tool will guide you through each lesson.

## Built With
- HTML 5
- Bootstrap
- JQuery

## Getting Started

To get a local copy of the project up and running, follow these simple example steps.

### Prerequisites
- Web browser
- CSV files containing lesson data

### Installation
1. Download the project files from the GitHub repository.

### Usage
1. After downloading the project files, open `index.html` in your preferred browser.
2. Open the CSV file of the lesson material you wish to study. In the `docs` folder, there are sample templates you can try. For a customized version of lesson material, follow this format:
    - **1st column**: The Question (it could be the 漢字 or another question type depending on your preference)
    - **2nd column**: The Answer (this can be the ひらがな translation of the Question or the English translation)
    - **3rd column**: The Hint (optional, a hint for the answer)
    - **4th column**: Example in Nihongo (optional)
    - **5th column**: Example in English (translated version of the Nihongo example, optional)
3. Upload your lesson material to the site and click "Take Quiz" to start answering questions.
4. Click "Hide/Show Hint" to toggle the hint display.
5. Click "Skip Item" to skip the current item. A yellow alert message will show the answer for the item skipped.
6. Click "End Quiz" to finish the quiz.

## About Developer

**Pearl Angelica C. Bravo**  
- [Facebook](https://www.facebook.com/pearlica/)  
- [GitHub](https://github.com/pearl-bravo)  
- Email: [pearlica09@gmail.com](mailto:pearlica09@gmail.com)
