# Code Reuse

How can I easily reuse functions and code between scripts?

Here is what I do when I want to reuse code in Office Scripts:

- I keep the code easily accessible. I store it in a GitHub repository or GitHub gists.
- I copy and paste the code into the script.

For a collection of functions you frequently use, it's possible to consolidate them. I would consolidate them all into a single file that you can easily copy and paste into your script. You can do this manually or write a script to do it. Then just click the file `Ctrl + A`, `Ctrl + C`, click the script and `Ctrl + V`.

You can easily consolidate multiple files with a simple python or node script - this is just having a list of file paths, reading the contents, concatenating, and writing to a single file.
