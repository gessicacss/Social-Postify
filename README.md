# Password Manager

## About

Social Postify is a api that enables users to create and schedule posts across multiple social media platforms. Users can create customized posts and select specific dates and times for each publication. The system supports scheduling multiple posts and provides a clear overview of scheduled posts.

## Technologies

<p align='center'>
<img style='margin: 2px;' src='https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white' alt='nestjs'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' alt='node.js'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white' alt='typescript'>
<img style='margin: 2px;' src='https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB' alt='express.js'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white' alt='prisma'>
<img style='margin: 2px;' src='https://img.shields.io/badge/postgres-%234ea94b.svg?style=for-the-badge&logo=postgresql&logoColor=white' alt='postgres'>
<img style='margin: 2px; width:70px' src='https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white/' alt='npm'>
</p>

## Routes

#### <span style='font-weight:bold;'>GET</span> /health

A route to check if the application is running. Returns "I'm okay!" with status code 200.

### Medias:

#### <span style='font-weight:bold;'>POST</span> /medias

Medias represent the social media platforms where posts (publications) will be made, e.g., Facebook, Instagram, Twitter. Returns status code 400 Bad Request in the absence of mandatory fields. Prevents the creation of a new record with the same combination of title and username, returning status code 409 Conflict. If its sucessfull it returns a 201 status code. The request body should contain:

```
{
    "title": "Instagram",
    "username": "myusername"
}
```

#### <span style='font-weight:bold;'>GET</span> /medias

Returns an empty array if no media is registered. Returns all registered media in the following format: 
```
[
    {
        "id": 1,
        "title": "Instagram",
        "username": "myusername"
    },
    {
        "id": 2,
        "title": "Twitter",
        "username": "myusername"
    }
]

```

#### <span style='font-weight:bold;'>GET</span> /medias/:id

Returns the record matching the provided ID. Returns status code 404 Not Found if no matching record is found.

```
[
    {
        "id": 1,
        "title": "Instagram",
        "username": "myusername"
    }
]
```

#### <span style='font-weight:bold;'>PUT</span> /medias/:id

Updates the record matching the provided ID. Returns status code 404 Not Found if no matching record is found. Ensures that the change does not violate the unique title and username rule, returning status code 409 Conflict.


```
{
    "title": "Instagram",
    "username": "myusername-changed"
}
```

#### <span style='font-weight:bold;'>DELETE</span> /medias/:id

Deletes the record matching the provided ID. Returns status code 404 Not Found if no matching record is found. Media can only be deleted if it is not part of any publication (scheduled or published), returning status code 403 Forbidden.


### Posts:
Posts represent the content that will be posted on social media through a publication.

#### <span style='font-weight:bold;'>POST</span> /posts

Receives title, text, and an optional image parameter in the request body. Returns status code 400 Bad Request in the absence of mandatory fields.

```
{
    "title": "Why you should have a guinea pig?",
    "text": "https://www.guineapigs.com/why-you-should-guinea"
}
```

#### <span style='font-weight:bold;'>GET</span> /posts

Returns an empty array if no posts are registered. Returns all registered posts in the following format:

```
[
    {
        "id": 1,
        "title": "Why you should have a guinea pig?",
        "text": "https://www.guineapigs.com/why-you-should-guinea"
    },
    {
        "id": 2,
        "title": "Man dies after coding for 400 hours non-stop",
        "text": "https://www.devnews.com/dies-after-400",
        "image": "https://www.devnews.com/dead-dev.jpg"
    }
]
```

#### <span style='font-weight:bold;'>GET</span> /posts/:id

Returns the record matching the provided ID. Returns status code 404 Not Found if no matching record is found.

```
[
    {
        "id": 1,
        "title": "Why you should have a guinea pig?",
        "text": "https://www.guineapigs.com/why-you-should-guinea"
    }
]
```

#### <span style='font-weight:bold;'>PUT</span> /posts/:id

Updates the record matching the provided ID. Returns status code 404 Not Found if no matching record is found.


```
[
    {
        "title": "Why you shouldn't have a guinea pig?",
        "text": "https://www.guineapigs.com/why-you-should-guinea"
    }
]
```

#### <span style='font-weight:bold;'>DELETE</span> /medias/:id

Deletes the record matching the provided ID. Returns status code 404 Not Found if no matching record is found. Posts can only be deleted if they are not part of any publication (scheduled or published), returning status code 403 Forbidden.

### Publictions:
Publications are the scheduled posts on social media.

#### <span style='font-weight:bold;'>POST</span> /publications

Receives mediaId, postId, and date parameters in the request body. Returns status code 400 Bad Request in the absence of mandatory fields. Returns status code 404 Not Found if no matching records are found for mediaId and postId.
```
{
    "mediaId": 1,
    "postId": 1,
    "date": "2023-08-21T13:25:17.352Z"
}
```

#### <span style='font-weight:bold;'>GET</span> /publications

Returns an empty array if no publications are registered. Returns all registered publications in the following format:

```
[
    {
        "id": 1,
        "mediaId": 1,
        "postId": 1,
        "date": "2023-08-21T13:25:17.352Z"
    },
    {
        "id": 2,
        "mediaId": 2,
        "postId": 1,
        "date": "2023-08-21T13:25:17.352Z"
    }
]
```

Special filters:
published (true/false): Filter for published or unpublished publications.
after (date): Filter for publications after a specific date. 

#### <span style='font-weight:bold;'>GET</span> /publications/:id

Returns the record matching the provided ID. Returns status code 404 Not Found if no matching record is found.

```
[
    {
        "id": 1,
        "mediaId": 1,
        "postId": 1,
        "date": "2023-08-21T13:25:17.352Z"
    }
]
```

#### <span style='font-weight:bold;'>PUT</span> /publications/:id

Updates the record matching the provided ID. Returns status code 403 Forbidden if attempting to change the information of a published publication; only scheduled publications can be modified. Returns status code 404 Not Found if no matching record is found. Returns status code 404 Not Found if no matching records are found for mediaId and postId.


```
[
    {
        "id": 1,
        "mediaId": 1,
        "postId": 1,
        "date": "2023-09-21T13:25:17.352Z"
    }
]
```

#### <span style='font-weight:bold;'>DELETE</span> /publications/:id

Deletes the record matching the provided ID. Returns status code 404 Not Found if no matching record is found. Posts can only be deleted if they are not part of any publication (scheduled or published), returning status code 403 Forbidden.

## How to run

1. Clone this repository
2. Install the dependencies

```
npm i
```
3. Run prisma
   
```
npx run prisma migrate dev
```
4. Run the back-end with

```
npm run start
```

5. Access http://localhost:3000 on your browser to run the API.
