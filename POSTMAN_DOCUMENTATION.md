# API Documentation

## Base URL
```
http://localhost:3000
```

## Folder Structure
```
📁 Assignment5_API
├── 📁 User APIs (4 requests)
│   ├── POST   /users/signup
│   ├── PUT    /users/:id
│   ├── GET    /users/by-email
│   └── GET    /users/:id
├── 📁 Post APIs (4 requests)
│   ├── POST   /posts
│   ├── DELETE /posts/:id
│   ├── GET    /posts/details
│   └── GET    /posts/comment-count
└── 📁 Comment APIs (6 requests)
    ├── POST   /comments
    ├── PATCH  /comments/:id
    ├── POST   /comments/find-or-create
    ├── GET    /comments/search
    ├── GET    /comments/newest/:postId
    └── GET    /comments/details/:id
```

---

## A - User APIs

### 1. Create User (Signup)

- **Method:** `POST`
- **URL:** `/users/signup`
- **Description:** Create a new user using build + save. Checks if email already exists before creating. Handles validation errors.

#### Request Body
```json
{
  "name": "User One",
  "email": "user1@gmail.com",
  "password": "securePassword123",
  "role": "user"
}
```

#### Success Response (201)
```json
{
  "message": "User added successfully."
}
```

#### Error Response - Email Exists (400)
```json
{
  "message": "Email already exists."
}
```

#### Error Response - Validation Error (400)
```json
{
  "message": "Must be a valid email address"
}
```

---

### 2. Create or Update User

- **Method:** `PUT`
- **URL:** `/users/:id`
- **Description:** Create or update a user based on PK. Uses `validate: false` to skip validation.

#### URL Parameter
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Integer | Primary Key of the user |

#### Request Body
```json
{
  "name": "Updated Name",
  "email": "updated@test.com",
  "role": "user"
}
```

#### Success Response (200)
```json
{
  "message": "User created or updated successfully"
}
```

---

### 3. Get User by Email

- **Method:** `GET`
- **URL:** `/users/by-email?email=user1@gmail.com`
- **Description:** Find a user by their email address.

#### Query Parameter
| Parameter | Type | Description |
|-----------|------|-------------|
| email | String | Email address to search for |

#### Success Response (200)
```json
{
  "id": 1,
  "name": "User One",
  "email": "user1@gmail.com",
  "role": "user",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

#### Error Response (404)
```json
{
  "message": "no user found"
}
```

---

### 4. Get User by PK (Exclude Role)

- **Method:** `GET`
- **URL:** `/users/:id`
- **Description:** Retrieve a user by PK, excluding the `role` field from the response.

#### URL Parameter
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Integer | Primary Key of the user |

#### Success Response (200)
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2024-01-01T15:00:00.000Z",
  "updatedAt": "2024-01-01T15:00:00.000Z"
}
```

#### Error Response (404)
```json
{
  "message": "no user found"
}
```

---

## B - Post APIs

### 5. Create Post

- **Method:** `POST`
- **URL:** `/posts`
- **Description:** Create a new post. Gets post data from the body.

#### Request Body
```json
{
  "title": "First Post",
  "content": "This is the content of the first post.",
  "userId": 1
}
```

#### Success Response (201)
```json
{
  "message": "Post created successfully."
}
```

---

### 6. Delete Post

- **Method:** `DELETE`
- **URL:** `/posts/:id`
- **Description:** Delete a post by its ID. Only the owner of the post can perform this action.

#### URL Parameter
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Integer | ID of the post to delete |

#### Request Body
```json
{
  "userId": 1
}
```

#### Success Response (200)
```json
{
  "message": "Post deleted."
}
```

#### Error Response - Not Authorized (403)
```json
{
  "message": "you are not authorized to delete this post."
}
```

#### Error Response - Not Found (404)
```json
{
  "message": "post not found."
}
```

---

### 7. Get All Post Details

- **Method:** `GET`
- **URL:** `/posts/details`
- **Description:** Retrieve all posts including the user details and associated comments.

#### Success Response (200)
```json
[
  {
    "id": 1,
    "title": "First Post",
    "user": {
      "id": 1,
      "name": "John Doe"
    },
    "comments": [
      {
        "id": 1,
        "content": "Great post!"
      }
    ]
  },
  {
    "id": 2,
    "title": "Second Post",
    "user": {
      "id": 2,
      "name": "Jane Smith"
    },
    "comments": [
      {
        "id": 2,
        "content": "Thanks for sharing."
      }
    ]
  }
]
```

---

### 8. Get All Post Comment Counts

- **Method:** `GET`
- **URL:** `/posts/comment-count`
- **Description:** Retrieve all posts and count the number of comments associated with each post.

#### Success Response (200)
```json
[
  {
    "id": 1,
    "title": "First Post",
    "commentCount": 3
  },
  {
    "id": 2,
    "title": "Second Post",
    "commentCount": 5
  }
]
```

---

## C - Comment APIs

### 9. Create Bulk Comments

- **Method:** `POST`
- **URL:** `/comments`
- **Description:** Create a bulk of comments at once.

#### Request Body
```json
{
  "comments": [
    {
      "content": "This is the first comment.",
      "postId": 1,
      "userId": 1
    },
    {
      "content": "Amazing post!",
      "postId": 1,
      "userId": 2
    },
    {
      "content": "I totally agree with this post.",
      "postId": 1,
      "userId": 1
    },
    {
      "content": "Thanks for sharing your thoughts.",
      "postId": 1,
      "userId": 2
    },
    {
      "content": "Looking forward to more posts like this!",
      "postId": 2,
      "userId": 1
    }
  ]
}
```

#### Success Response (201)
```json
{
  "message": "comments created."
}
```

---

### 10. Update Comment

- **Method:** `PATCH`
- **URL:** `/comments/:id`
- **Description:** Update the content of a specific comment by its ID. Only the owner of the comment can perform this action.

#### URL Parameter
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Integer | ID of the comment to update |

#### Request Body
```json
{
  "userId": 3,
  "content": "updated"
}
```

#### Success Response (200)
```json
{
  "message": "comment updated."
}
```

#### Error Response - Not Authorized (403)
```json
{
  "message": "you are not authorized to update this comment."
}
```

#### Error Response - Not Found (404)
```json
{
  "message": "comment not found."
}
```

---

### 11. Find or Create Comment

- **Method:** `POST`
- **URL:** `/comments/find-or-create`
- **Description:** Find a comment for a specific post, user, and content. If the comment exists, return it; otherwise, create a new comment with the given details.

#### Request Body
```json
{
  "postId": 1,
  "userId": 2,
  "content": "This is a sample comment"
}
```

#### Success Response - Existing Comment (200)
```json
{
  "id": 1,
  "content": "This is a sample comment",
  "postId": 1,
  "userId": 2,
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

#### Success Response - New Comment (201)
```json
{
  "id": 5,
  "content": "This is a sample comment",
  "postId": 1,
  "userId": 2,
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

---

### 12. Search Comments

- **Method:** `GET`
- **URL:** `/comments/search?word=important`
- **Description:** Retrieve all comments that contain a specific word in their content and return the number of comments matched.

#### Query Parameter
| Parameter | Type | Description |
|-----------|------|-------------|
| word | String | Word to search for in comment content |

#### Success Response (200)
```json
{
  "count": 2,
  "comments": [
    {
      "id": 1,
      "content": "This is an important comment",
      "postId": 1,
      "userId": 1,
      "createdAt": "2024-01-11T12:00:00.000Z",
      "updatedAt": "2024-01-11T12:00:00.000Z"
    },
    {
      "id": 2,
      "content": "Another important remark",
      "postId": 1,
      "userId": 2,
      "createdAt": "2024-01-11T12:00:00.000Z",
      "updatedAt": "2024-01-11T12:00:00.000Z"
    }
  ]
}
```

#### Error Response (404)
```json
{
  "message": "no comments found."
}
```

---

### 13. Get 3 Most Recent Comments

- **Method:** `GET`
- **URL:** `/comments/newest/:postId`
- **Description:** Retrieve the 3 most recent comments for a specific post, ordered by creation date (newest first).

#### URL Parameter
| Parameter | Type | Description |
|-----------|------|-------------|
| postId | Integer | ID of the post |

#### Success Response (200)
```json
[
  {
    "id": 10,
    "content": "This is the newest comment.",
    "createdAt": "2024-01-11T20:00:00.000Z"
  },
  {
    "id": 9,
    "content": "Thanks for sharing!",
    "createdAt": "2024-01-10T18:00:00.000Z"
  },
  {
    "id": 8,
    "content": "Great insights in this post.",
    "createdAt": "2024-01-10T15:00:00.000Z"
  }
]
```

---

### 14. Get Comment Details by PK

- **Method:** `GET`
- **URL:** `/comments/details/:id`
- **Description:** Get a specific comment by PK with user and post information.

#### URL Parameter
| Parameter | Type | Description |
|-----------|------|-------------|
| id | Integer | Primary Key of the comment |

#### Success Response (200)
```json
{
  "id": 1,
  "content": "This is a great post!",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "post": {
    "id": 1,
    "title": "First Post",
    "content": "This is the content of the first post."
  }
}
```

#### Error Response (404)
```json
{
  "message": "no comment found"
}
```

---

## Important Notes for Postman

1. Name each endpoint with a meaningful name like "Add User", not dummy names.
2. Save your changes on each request (Ctrl+S).
3. Include the Postman collection link (export your Postman collection) in the email with your assignment link.
