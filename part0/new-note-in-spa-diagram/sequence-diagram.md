```mermaid
sequenceDiagram
participant browser
participant server

    Note right of browser: Having loaded the page, the user submits the form, and the form.onsubmit function in spa.js 
    runs, which posts the content to the server.
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    
    Note right of browser: The browser itself adds the new note to its notes array and redraws the list, without any 
    further HTTP requests.
```