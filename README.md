# Node.js URL Shortening Service

This is a Node.js project for a URL shortening service.

## Setup

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Create a `.env` file in the root directory of the project.
4. Add the following environment variables to the `.env` file:

```
MONGO_URI=<your_mongo_db_connection_string>
BASE=<your_base_url>
```

Make sure to replace `<your_mongo_db_connection_string>` with your actual MongoDB connection string and `<your_base_url>` with the base URL of your application.

5. Run `node app.js` to start server.

## API Endpoints

1. `POST /shorten`: Create a shortened URL.

Method: POST

Description: This endpoint creates a shortened URL. It expects a JSON payload with the originalUrl. If the URL has already been shortened and exists in the database, it returns the existing shortened URL. Otherwise, it generates a new shortened URL.

Request Body:

```
{
  "originalUrl": "https://example.com"
}
```

Response:

    200 OK: If the URL is valid and has been shortened successfully, it returns the details of the shortened URL:
```
{
  "_id": "612e8d1f9b1e8a5f5d8f8a7c",
  "urlId": "abcde",
  "originalUrl": "https://example.com",
  "shortUrl": "http://your-base-url.com/abcde",
  "accessCount": 0,
  "__v": 0
}
```

400 Bad Request: If the URL is invalid, it returns:

```
{
  "message": "Invalid URL"
}
```

500 Internal Server Error: If there is a server error, it returns:

```
{
  "message": "Server Error"
}
```

2. `GET /shorten/:urlId`: Returns the original URL for the given shortened URL.

Method: GET

Description: This endpoint returns the original URL for the given shortened URL. It expects the URL ID as a URL parameter.

Response:

    200 OK: If the URL ID exists in the database, it returns the details of the original URL:
```
{
  "_id": "612e8d1f9b1e8a5f5d8f8a7c",
  "urlId": "abcde",
  "originalUrl": "https://example.com",
  "shortUrl": "http://your-base-url.com/abcde",
  "accessCount": 0,
  "__v": 0
}
```

404 Not Found: If the URL ID does not exist in the database, it returns:

```
{
  "message": "Not found"
}
```

500 Internal Server Error: If there is a server error, it returns:

```
{
  "message": "Server Error"
}
```

3. `GET shorten/:urlId/stats`: Returns the access count for the given shortened URL.

Method: GET

Description: This endpoint returns the access count for the given shortened URL. It expects the URL ID as a URL parameter.

Response:

    200 OK: If the URL ID exists in the database, it returns the access count for the shortened URL:
```
{
  "_id": "612e8d1f9b1e8a5f5d8f8a7c",
  "urlId": "abcde",
  "originalUrl": "https://example.com",
  "shortUrl": "http://your-base-url.com/abcde",
  "accessCount": 7,
  "__v": 0
}
```

404 Not Found: If the URL ID does not exist in the database, it returns:

```
{
  "message": "Not found"
}
```

500 Internal Server Error: If there is a server error, it returns:

```
{
  "message": "Server Error"
}
```

4. `PUT /shorten/:urlId`: Updates the original URL for the given shortened URL.

Method: PUT

Description: This endpoint updates the original URL for the given shortened URL. It expects the URL ID as a URL parameter and a JSON payload with the updated original URL.

Request Body:

```
{
  "originalUrl": "https://new-example.com"
}
```

Response:

    200 OK: If the URL ID exists in the database and the original URL is updated successfully, it returns the details of the updated URL:
```
{
  "_id": "612e8d1f9b1e8a5f5d8f8a7c",
  "urlId": "abcde",
  "originalUrl": "https://new-example.com",
  "shortUrl": "http://your-base-url.com/abcde",
  "accessCount": 7,
  "__v": 0
}
```

404 Not Found: If the URL ID does not exist in the database, it returns:

```
{
  "message": "Not found"
```

500 Internal Server Error: If there is a server error, it returns:

```
{
  "message": "Server Error"
}
```

5. `DELETE /shorten/:urlId`: Deletes the shortened URL.

Method: DELETE

Description: This endpoint deletes the shortened URL for the given URL ID.

Response:

    204 No Content: If the URL ID exists in the database and the URL is deleted successfully, it returns:
```
{
  "message": "Deleted"
}
```

404 Not Found: If the URL ID does not exist in the database, it returns:

```
{
  "message": "Not found"
}
```

500 Internal Server Error: If there is a server error, it returns:

```
{
  "message": "Server Error"
}
```



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This project is a exercise from roadmap.sh. You can check the project here:
https://roadmap.sh/projects/url-shortening-service