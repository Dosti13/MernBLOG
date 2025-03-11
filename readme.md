# BLOGSo

BLOGSo is a full-stack blog application built with Node.js, Express, and MongoDB. It allows users to register, log in, create and manage blog posts with image uploads, and add comments. Images are stored on Cloudinary, and the application uses EJS as its view engine and Bootstrap for styling.

## Features

- **User Authentication:**  
  Users can sign up, log in, and log out. Authentication is managed with cookies and custom middleware.

- **Blog Posts:**  
  Authenticated users can create, update, and delete blog posts with titles, descriptions, and image uploads. Uploaded images are stored on Cloudinary. When a blog is deleted, the corresponding Cloudinary image is also removed.

- **Comments:**  
  Users can view and add comments on blog posts.

- **File Uploads:**  
  Uses Multer (via a custom middleware) for handling file uploads and Cloudinary for image storage.

- **Responsive Design:**  
  The application uses EJS templates and Bootstrap 5 for a responsive and user-friendly interface.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** EJS, HTML, CSS, Bootstrap 5
- **File Uploads:** Multer
- **Cloud Storage:** Cloudinary
- **Authentication:** Custom middleware with cookies
- **Environment Variables:** dotenv

## Project Structure

```plaintext
Blog/
├── controllers/
│   ├── BlogController.js       # Controller logic for blog operations
│   ├── CommentController.js    # Controller logic for comment operations
│   └── UserController.js       # Controller logic for user operations
├── db/
│   └── config.js               # MongoDB connection configuration
├── middlewear/
│   ├── auth.js                 # Authentication middleware
│   └── upload.js               # Middleware for handling file uploads (Multer configuration)
├── models/
│   ├── Blog.js                 # Blog model schema (includes Cloudinary file URL and optionally public_id)
│   ├── Comment.js              # Comment model schema
│   └── User.js                 # User model schema
├── router/
│   ├── Blog.js                 # Blog-related routes (CRUD operations)
│   ├── Comment.js              # Comment-related routes
│   ├── static.js               # Static page routes (home, login, signup, addblog, update)
│   └── User.js                 # User-related routes (registration, login)
├── views/
│   ├── partials/
│   │   ├── header.ejs          # Header partial (includes navigation with conditional login/logout)
│   │   └── footer.ejs          # Footer partial (if any)
│   ├── index.ejs               # Home page view
│   ├── login.ejs               # Login page view
│   ├── signup.ejs              # Signup page view
│   ├── addblog.ejs             # Page for creating a new blog post
│   └── update.ejs              # Page for updating an existing blog post
├── .env                        # Environment variables (not included in Git)
├── .gitignore                  # Git ignore file (node_modules, .env, etc.)
├── README.md                   # Project documentation
└── app.js                      # Main Express server file
