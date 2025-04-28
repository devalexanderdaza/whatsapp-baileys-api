# Baileys API

An implementation of [@whiskeysockets/Baileys](https://github.com/whiskeysockets/Baileys) as a simple RESTful API service with multiple device support. This project implements both **Multi-Device** client so that you can choose and use one of them easily.

## Requirements

-   **NodeJS** version **18.16.0** or higher.

## Installation

1. Download or clone this repo.
2. Enter to the project directory.
3. Install the dependencies.

## `.env` Configurations

```env
# Api host and port
HOST=127.0.0.1
PORT=8000

# Number retry to connect to whatsapp -1 for infinite
MAX_RETRIES=-1

# Maximun time to connect to whatsapp
RECONNECT_INTERVAL=5000

# Authentication
AUTHENTICATION_GLOBAL_AUTH_TOKEN=A4gx18YGxKAvR01ClcHpcR7TjZUNtwvE

# WEBHOOK CONFIGURATION
APP_WEBHOOK_URL=""
APP_WEBHOOK_ALLOWED_EVENTS=MESSAGES_UPSERT,MESSAGES_DELETE,MESSAGES_UPDATE
APP_WEBHOOK_FILE_IN_BASE64=false

```

## Usage

1. You can start the app by executing `npm run start` or `node .`.
2. Now the endpoint should be available according to your environment variable configurations. Default is at `http://localhost:8000`.

Also check out the `examples` directory for the basic usage examples.

## API Docs

The API documentation is available online [here](https://documenter.getpostman.com/view/9471522/2s8YehTwHJ). You can also import the **Postman Collection File** `(postman_collection.json)` into your Postman App alternatively.

The server will respond in following JSON format:

```javascript
{
    success: true|false, // bool
    message: "", // string
    data: {}|[] // object or array of object
}
```

##  Available Features
At this moment we are working to bring more functionalities
### Autentication
    * ApiKey (By default it is not active, change it in env by adding your custom key)
### Sessions
    * Find Session
    * Session Status
    * List Sessions
	* Create New Session
        => QR method (Default)
        => Pairing Code method
	* Delete Session
### Chats
    * Get Chat List
    * Get Conversation
    * Forward Message
    * Send Presence Update
    * Read Message
    * Send  Bulk Message
    * Send Message Types
        => Send Message Text
        => Send Message Image
        => Send Message Audio
        => Send Message Video
        => Send Message Document
        => Send Message Gif
        => Send Message Sticker
        => Send Message Contact
        => Send Message Location
        => Send Message React
        => Send Message List (Deprecated)
        => Send Message Buttons (Deprecated)
        => Send Message Template (Deprecated)
        => Send Message How To Forward
### Groups
    * Get Chat List
    * Get Conversation
    * Get Group Metadata
    * Create Group
    * Group Update Participants
    * Group Update Subject
    * Group Update Description
    * Group Update Settings
    * Group Get Invite Code
    * Group Join Invite Code
    * Group Revoke Invite Code
    * Group Update Picture
    * Group List Without Participants
### Misc
    * Update Profile Status
    * Update Profile Name
    * Update Progile Image (NEW)
    * Get My Profile {name, phote, status} (NEW)
    * Get Profile User (NEW)
    * Block And Unblock User (NEW)

### Webhook
    * Global webhook

## Webhook Events
Configure in .env by default this `MESSAGES_UPSERT,MESSAGES_DELETE,MESSAGES_UPDATE` or use `ALL`
If it is necessary to send multimedia message in base64 use `APP_WEBHOOK_FILE_IN_BASE64=true`

| Name | Event | TypeData | Description |
|------|-------|-----------|------------|
| ALL |  |  | All event send to Webhook  |
| QRCODE_UPDATED | qrcode.updated | json | Sends the base64 of the qrcode for reading |
| CONNECTION_UPDATE | connection.update | json | Informs the status of the connection with whatsapp |
| MESSAGES_UPSERT | message.upsert | json |  Notifies you when a message is received |
| MESSAGES_UPDATE | message.update | json | Tells you when a message is updated |
| MESSAGES_DELETE | messages.delete | JSON | Notifies when message is delete  |
| MESSAGING_HISTORY_SET | messaging-history.set | JSON | set chats (history sync), everything is reverse chronologically sorted|
| MESSAGES_MEDIA_UPDATE | messages.media-update | JSON | Notifies when a message message media have update |
| MESSAGES_REACTION | messages.reaction | JSON | message was reacted to. If reaction was removed -- then "reaction.text" will be falsey  |
| MESSAGES_RECEIPT_UPDATE | message-receipt.update | JSON | Notifies when a message have update |
| MESSAGES_DELETE | messages.delete | JSON |  Notifies when a message is delete  |
| CONTACTS_SET | contacts.set | json | Performs initial loading of all contacts</br>This event occurs only once |
| CONTACTS_UPSERT | contacts.upsert | json | Reloads all contacts with additional information</br>This event occurs only once |
| CONTACTS_UPDATE | contacts.update | json | Informs you when the chat is updated |
| PRESENCE_UPDATE | presence.update | json |  Informs if the user is online, if he is performing some action like writing or recording and his last seen</br>'unavailable' | 'available' | 'composing' | 'recording' | 'paused' |
| CHATS_SET | chats.set | json | Send a list of all loaded chats |
| CHATS_UPDATE | chats.update | json | Informs you when the chat is updated |
| CHATS_UPSERT | chats.upsert | json | Sends any new chat information |
| CHATS_DELETE | chats.delete | JSON |  Notifies when chats is delete  |
| GROUPS_UPSERT | groups.upsert | JSON | Notifies when a group is created |
| GROUPS_UPDATE | groups.update | JSON | Notifies when a group has its information updated |
| GROUP_PARTICIPANTS_UPDATE | group-participants.update | JSON | Notifies when an action occurs involving a participant</br>'add' | 'remove' | 'promote' | 'demote' |
| BLOCKLIST_SET | blocklist.set | JSON |  Notifies when is set contact in blocklist |
| BLOCKLIST_UPDATE | blocklist.update | JSON | event of add/remove contact in blocklist  |
| LABELS_EDIT | labels.edit | JSON | event edit label |
| LABELS_ASSOCIATION | labels.association | JSON | add/remove chat label association action |


## Known Issue

Currently there's no known issues. If you find any, please kindly open a new one.

## Notes

-   The app only provide a very simple validation, you may want to implement your own.
-   When sending message, your `message` property will not be validated, so make sure you sent the right data!
-   There's no authentication, you may want to implement your own.
-   The **Beta Multi-Device** client use provided Baileys's `makeInMemoryStore` method which will store your data in memory and a json file, you may want to use a better data management.
-   Automatically reading incoming messages is now disabled by default. Uncomment `whatsapp.js:91-105` to enable this behaviour.
-   If you have problems when deploying on **CPanel** or any other similar hosting, transpiling your code into **CommonJS** should fix the problems.

## Notice

This project is intended for learning purpose only, don't use it for spamming or any activities that's prohibited by **WhatsApp**.
