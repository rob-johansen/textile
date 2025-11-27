# Textile

## Flow

### Launch

1. The user launches Textile.
2. Textile tries to read the user's textiles—the `.json` files in the `app.getPath('documents')/Textile` directory.
    - If this directory doesn't exist, Textile tries to create it.
        - If creating the directory fails, Textile tries to log an error to the `app.getPath('logs')/textiles.log` file.
            - On macOS, this file is `/Users/rob/Library/Logs/Textile/textiles.log`.
            - On Windows, this directory is apparently `C:\Users\<username>\AppData\Roaming\Textile\logs\textiles.log`.
            - If writing the log file fails, good luck to the user.
3. If the user has no textiles, Textile checks for an `onboarded` file in the `app.getPath('userData')` directory.
    - If this file does not exist (i.e. the user has not been onboarded), Textile shows its onboarding tutorial:
        - Screen 1...
    - If this file does exist, the flow continues.
4. 

### New Textile

1. Textile shows a "New Textile" heading
2. Textile shows a text field labeled "Name"
3. Textile shows "1. Start with" and an `input` dropdown with "..." placeholder and these options:
    - Text that I will provide now
    - The contents of my clipboard when I run this textile
    - The output of a command when I run this textile
4. The user selects an option to start with.
5. Textile shows whatever is needed for gathering input relevant to the selected option:
    - For the "Text that I will provide now" option, Textile shows a textarea
    - For the "The contents of my clipboard when I run this textile" option, Textile shows nothing
    - For the "The output of a command when I run this textile" option, Textile shows a textarea
6. Textile also shows two buttons:
    - Add Step
    - Finish
7. When "Add Step" is clicked, Textile shows "2." and an `action` dropdown with "..." placeholder and these options:
    - Append
    - Prepend
    - Remove
    - Replace
8. When an action is selected, Textile shows a new `input` dropdown with "..." placeholder and options corresponding to the action
9. When "Finish" is clicked, Textile displays its concluding dropdown with the following options:
    - Copy the result to my clipboard
    - Show the result
    - Show the result and copy it to my clipboard
10. Textile also shows a "Keyboard Shortcut" field
