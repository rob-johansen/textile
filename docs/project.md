# Textile

## Flow

1. The user launches Textile.
2. Textile tries to read the `.json` files in the `app.getPath('documents')/Textiles` directory.
    - If the directory doesn't exist, Textile tries to create it.
        - If creating the directory fails, Textile tries to log an error to  `app.getPath('temp')/Textiles` directory.
            - If that fails, good luck to the user.

