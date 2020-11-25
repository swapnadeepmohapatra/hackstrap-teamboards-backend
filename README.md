# TEAMBAORDS BACKEND

**Base URL :** https://api.hackstrap.com/teamboards/

## Project

### Get Project

`https://api.hackstrap.com/teamboards/project`

- Method

`GET`

- Response

```json
{
  "projects": [
    {
      "_id": "5f929f550194995f60eb8a8a",
      "title": "Blank Project",
      "desc": null,
      "boards": [
        {
          "_id": "5f929f670194995f60eb8a8b",
          "title": "Board - 1",
          "desc": "",
          "author": "5eccb8bf47cb055c16aacc98",
          "lists": [
            "5f97b960a8934f5ffc51c8fa",
            "5f929fe30194995f60eb8a8f",
            "5f95271f54930157d44ef527"
          ],
          "members": ["5eccb8bf47cb055c16aacc98"],
          "project": "5f929f550194995f60eb8a8a"
        }
      ],
      "author": "5eccb8bf47cb055c16aacc98",
      "members": ["5eccb8bf47cb055c16aacc98"]
    },
    {
      "_id": "5f9fdacabbfb965e68cb86df",
      "title": "Good Project",
      "desc": null,
      "boards": [],
      "author": "5eccb8bf47cb055c16aacc98",
      "members": ["5eccb8bf47cb055c16aacc98"]
    }
  ]
}
```

---

### Add New Project

`https://api.hackstrap.com/teamboards/project/add`

- Method

`POST`

- Request Body

```json
{
  "title": "Project Title"
}
```

---

### Edit Project Title

`https://api.hackstrap.com/teamboards/project/edit`

- Method

`PATCH`

- Request Body

```json
{
  "projectID": "5f9fdacabbfb965e68cb86df",
  "projectTitle": "Good Project"
}
```

---

### Delete Project

`http://localhost:1212/teamboards/project/delete`

- Method

`DELETE`

- Request Body

```json
{
  "projectID": "5fa01dd70ffdc4427862126c"
}
```

---

## Board

---

### Get Board

`https://api.hackstrap.com/teamboards/board`

- Method

`GET`

- Request Body

```json
{
  "boardID": "5f929f670194995f60eb8a8b"
}
```

- Response

```json
{
  "board": {
    "_id": "5f929f670194995f60eb8a8b",
    "title": "Board - 1",
    "desc": "",
    "author": "5eccb8bf47cb055c16aacc98",
    "lists": [
      "5f97b960a8934f5ffc51c8fa",
      "5f929fe30194995f60eb8a8f",
      "5f95271f54930157d44ef527"
    ],
    "members": ["5eccb8bf47cb055c16aacc98"],
    "project": "5f929f550194995f60eb8a8a"
  }
}
```

---

### Add New Board

`https://api.hackstrap.com/teamboards/board/project/add`

- Method

`POST`

- Request Body

```json
{
  "title": "Project Name",
  "project": "5f9fdacabbfb965e68cb86df"
}
```

---

### Delete Board

`https://api.hackstrap.com/teamboards/board/delete`

- Method

`DELETE`

- Request Body

```json
{
  "boardID": "5fa13abdee363f3984d5b7b6",
  "projectID": "5f9fdacabbfb965e68cb86df"
}
```

## List

### Get Lists

`http://localhost:1212/teamboards/list`

- Method

`GET`

- Request Body

```json
{
  "listID": "5f929fe30194995f60eb8a8f"
}
```

- Response

```json
{
  "lists": [
    {
      "_id": "5f929fe30194995f60eb8a8f",
      "title": "List - 1",
      "cards": [
        {
          "_id": "5f94340002b9938384d66b0d",
          "text": "New Card - 1",
          "list": "5f929fe30194995f60eb8a8f",
          "dueDate": "2020-07-06T06:16:09.899Z",
          "priority": 1
        }
      ],
      "board": "5f929f670194995f60eb8a8b"
    }
  ]
}
```

---

### Add new List

`http://localhost:1212/teamboards/list/add`

- Method

`POST`

- Request Body

```json
{
  "title": "Awesome List",
  "board": "5f95244fd05c724af01bc4b2"
}
```

---

### Edit List Title

`http://localhost:1212/teamboards/list/edit`

- Method

`PATCH`

- Request Body

```json
{
  "listID": "5f929fe30194995f60eb8a8f",
  "listTitle": "List - 1"
}
```

---

### Drag Lists

`http://localhost:1212/teamboards/list/drag`

- Method

`PUT`

- Request Body

```json
{
  "boardID": "5f929f670194995f60eb8a8b",
  "droppableIndexEnd": 0,
  "droppableIndexStart": 2
}
```

---

### Delete Lisst

`http://localhost:1212/teamboards/list/delete`

- Method

`DELETE`

- Request Body

```json
{
  "listID": "5f97b95ba8934f5ffc51c8f9",
  "boardID": "5f929f670194995f60eb8a8b"
}
```

## Card

### Add new card

`http://localhost:1212/teamboards/card/add`

- Method

`POST`

- Request Body

```json
{
  "text": "Good Card",
  "list": "5f97b960a8934f5ffc51c8fa"
}
```

---

### Drag Cards

`http://localhost:1212/teamboards/card/drag`

- Method

`PUT`

- Request Body

```json
{
  "droppableIdStart": "5f97b95ba8934f5ffc51c8f9",
  "droppableIdEnd": "5f97b95ba8934f5ffc51c8f9",
  "droppableIndexEnd": 1,
  "droppableIndexStart": 3
}
```

---

### Delete Card

`http://localhost:1212/teamboards/card/delete`

- Method

`DELETE`

- Request Body

```json
{
  "listID": "5f929fe30194995f60eb8a8f",
  "cardID": "5f95168e11674e552c203c48"
}
```
