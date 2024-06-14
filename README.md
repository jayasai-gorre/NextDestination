# Next Destination 🌍

Next Destination is a full-stack web application built with Node.js, Express.js, and MongoDB, designed to help users list and discover hotels around the world.

## ✨ Features

- **Signup and Login**: Secure authentication system using JWT tokens and Passport.js for hashing and salting passwords.
  
- **Hotel Listing**: Users can easily create and manage hotel listings 🏨, including uploading images 🖼️. Cloudinary is used for efficient image storage.

- **Automatic Location Fetching**: Utilizes the Mapbox API 🗺️ for geocoding, automatically pinpointing locations entered by users on an interactive map.

- **User-Specific Permissions**: Only creators of hotel listings can edit ✏️ or delete 🗑️ their entries, ensuring data integrity and user control.

- **Review System**: Users can leave reviews ✍️ for hotels, and only the review authors can delete their own reviews.

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript (EJS templating)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for storing user data, hotel listings, and reviews)
- **APIs**: Mapbox API (for geocoding), Cloudinary (for image storage)

## 🚀 Getting Started

1. Clone the repository.
2. Install dependencies (`npm install`).
3. Set up environment variables for API keys and MongoDB connection.
4. Run the application (`nodemon app.js`).

## 🤝 Contributions

Contributions are welcome! Fork the repository and submit a pull request with your enhancements.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
