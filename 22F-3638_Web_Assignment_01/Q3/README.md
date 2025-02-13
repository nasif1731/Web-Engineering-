# Selective String Reversal Tool

I implemented this interactive web-based tool to transform user-inputted strings by reversing them while skipping characters at specific intervals. The skip interval is determined by summing the digits of a roll number or using a manually entered value.

## Features
- Reverse a string while skipping every N-th character.
- Compute N by summing the digits of the roll number.
- Option to manually set N.
- Dynamically updates results using JavaScript.

## Technologies Used
- HTML, CSS, JavaScript (Vanilla)

## How It Works
1. Enter a string and roll number (or custom N).
2. Click "Transform" to see the modified string.
3. Results appear dynamically on the page.

## Constraints Handled
- Ensures N is at least 1.
- Maintains spaces and special characters.
- Handles cases where N > string length.

Enjoy experimenting with string transformations!
