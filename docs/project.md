# Textile

## Flow

1. The user launches Textile.
2. Textile tries to read the `.json` files in the `app.getPath('documents')/Textiles` directory.
    - If the directory doesn't exist, Textile tries to create it.
        - If creating the directory fails, Textile tries to log an error to the `app.getPath('logs')/Textiles` directory.
            - On macOS, this directory is `/Users/rob/Library/Logs/Textile`.
            - On Windows, this directory is apparently `C:\Users\<username>\AppData\Roaming\Textile\logs`.
            - If writing the log file fails, good luck to the user.
