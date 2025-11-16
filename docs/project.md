# Textile

## Flow

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
