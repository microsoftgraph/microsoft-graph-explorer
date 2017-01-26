var postTemplates = {
    messages: {
        "subject": "Meet for lunch?",
        "body": {
            "contentType": "Text",
            "content": "The new cafeteria is open."
        },
        "toRecipients": [
            {
                "emailAddress": {
                "address": "garthf@contoso.com"
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
    },
    sendMail: {
        "message": {
            "subject": "Meet for lunch?",
            "body": {
                "contentType": "Text",
                "content": "The new cafeteria is open."
            },
            "toRecipients": [
                {
                    "emailAddress": {
                    "address": "garthf@contoso.com"
                    }
                }
            ]
        },
        "saveToSentItems": "false"
    },
    findMeetingTimes: {
        "attendees": [
            {
            "emailAddress": {
                "address": "FULL_USER_EMAIL",
                "name": "Alex Darrow"
            },
            "type": "Required"
            }
        ],
        "timeConstraint": {
            "timeslots": [
            {
            "start": {
                "dateTime": "2016-10-20T07:00:00",  
                "timeZone": "Pacific Standard Time" 
                },  
                "end": { 
                "dateTime": "2016-10-20T17:00:00",  
                "timeZone": "Pacific Standard Time" 
                }
            }
            ]
        },
        "locationConstraint": {
        "isRequired": "false",
        "suggestLocation": "true",
        "locations": [
            {
            "displayName": "Conf Room 32/1368",
            "locationEmailAddress": "conf32room1368@imgeek.onmicrosoft.com"
            }
        ]
        },
        "meetingDuration": "PT1H"
        },
    users: {
        "accountEnabled": true,
        "city": "Seattle",
        "country": "United States",
        "department": "Sales & Marketing",
        "displayName": "Melissa Darrow",
        "givenName": "Melissa",
        "jobTitle": "Marketing Director",
        "mailNickname": "MelissaD",
        "passwordPolicies": "DisablePasswordExpiration",
        "passwordProfile": {
            "password": "Test1234",
            "forceChangePasswordNextSignIn": false
        },
        "officeLocation": "131/1105",
        "postalCode": "98052",
        "preferredLanguage": "en-US",
        "state": "WA",
        "streetAddress": "9256 Towne Center Dr., Suite 400",
        "surname": "Darrow",
        "mobilePhone": "+1 206 555 0110",
        "usageLocation": "US",
        "userPrincipalName": "MelissaD@AUTHENTICATED_DOMAIN",
    },
    groups: {
        "@odata.type": "#Microsoft.Graph.Group",
        "description": "This group is the best ever",
        "displayName": "Unified group 3ef15",
        "groupTypes": [
            "Unified"
        ],
        "mailEnabled": true,
        "mailNickname": "Group911e5",
        "securityEnabled": true
    },
    contacts: {
        "givenName": "Pavel",
        "surname": "Bansky",
        "emailAddresses": [
            {
            "address": "pavelb@fabrikam.onmicrosoft.com",
            "name": "Pavel Bansky"
            }
        ],
        "businessPhones": [
            "+1 732 555 0102"
        ]
    }
}

var templateNames = {
    messages: 'message',
    events: 'event',
    sendMail: 'email'
}