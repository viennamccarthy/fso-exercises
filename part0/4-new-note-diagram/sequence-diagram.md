sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note: note	"Hello+from+California+on+a+Friday+morning"
    activate server
    Note left of server: The server processes the form data and redirects the browser
    server-->>browser: URL redirect to /exampleapp/notes
    deactivate server

    Note right of browser: The browser reloads the page content, which now includes the submitted data

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Hello from California on+a Friday morning", "date": "2024-7-5" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the updoted notes