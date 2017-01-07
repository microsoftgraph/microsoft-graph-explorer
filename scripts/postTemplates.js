var postTemplates = {
    
    messages: {
        "subject": "My message",
        "body": {
            "contentType": "html",
            "content": "<h1>My message</h1>"
        },
        "toRecipients": [
            {
                "emailAddress": {
                    "name": "John Doe",
                    "address": "john@example.com"
                }
            }
        ]
    },
    
    events: {
        "subject": "My event",
        "start": {
            "dateTime": "2017-05-07T16:15:00.0000000",
            "timeZone": "UTC"
        },
        "end": {
            "dateTime": "2017-06-07T16:15:00.0000000",
            "timeZone": "UTC"
        },
    }
}