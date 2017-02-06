## 1.0.2 (Not yet published)
#### Bug fixes:
#### New features:
* Autocomplete options are abbreviated when they get too long.

## 1.0.1 (2/8/2017)
#### Bug fixes:
* Fixed an issue with the admin consent flow not working with Hello.js when it's configured for only AAD

#### New features:
* Tooltip on the button that launches the share dialog for accessibility and UX
* Automatically change version dropdown when user types in a different version in the url bar
* More strongly typed components to prevent run time errors


## 1.0.0 (2/2/2017)
#### Bug fixes:
* Response code is “undefined” when displaying pictures.
* Users can now enter multiple custom headers.
* Response headers are now displayed for all response status codes. Previously, we hid headers if there was a 400 or 500 error.
* Tabs frequently collapse when trying to switch between them.
* Autocomplete options aren't displayed until user starts typing.
* Autocomplete options are empty when switching between GET and DELETE

#### New features:
* Switched to Hello.js for authentication and limited account type to only AAD as a temporary workaround for the MSA URL length bug
* POST templates for 7 endpoints (messages, events, sendMail, users, groups, contacts, findMeetingTimes).
* New share query dialog to let users copy a deep-link to the explorer. 
* History is preserved in a client cache so users can pick up where they left off after a page refresh. 
* Front end localization from JSON files.
* Added “Login to change the request type” tooltip on the disabled GET button.
