# FindMyCollege

FindMyCollege is a lightweight web application that helps students discover and compare colleges across India. Built with Node.js, Express, and MongoDB (Mongoose), it provides search, filter, and detailed college pages, and is deployed on Railway with a custom domain (https://codedeck.me). The codebase is simple and easy to extend for new data fields, filters, or UI improvements.

## Features
- Search colleges by name and basic filters
- View college details (location, courses, contact info, etc.)
- RESTful API endpoints for colleges
- Simple, easy-to-extend codebase

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- HTML / CSS / JavaScript (frontend)
- Deployed on Railway (custom domain: codedeck.me)

## Live Demo
https://codedeck.me

## Getting Started (Local)

1. Clone the repository
```bash
git clone https://github.com/PurushottamBarai/FindMyCollege.git
cd FindMyCollege
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables

Create a `.env` file or set environment variables in your shell. Example variables:

```
MONGOHOST=mongodb.railway.internal
MONGOUSER=mongo
MONGOPASSWORD=your_mongo_password
MONGOPORT=27017
DB_NAME=findmycollege
PORT=8080
```

Note: The repo may use either MONGOHOST/MONGOUSER/MONGOPASSWORD or DB_HOST/DB_USER/DB_PASS naming. Check `src/config/database.js` (or your connection file) to confirm which variable names the code reads.

4. Start the app
```bash
npm start
```
The server runs on `http://localhost:8080` (or the port defined in your env).

## Deployment Notes
- When deploying on Railway, add the same environment variables to the *FindMyCollege* service (per-service variables on Railway).
- If using the root/admin user for the MongoDB instance, ensure the connection uses `authSource: 'admin'`.
- To use a custom domain on Railway, add the domain in the Railway service settings and create the CNAME record at your registrar (e.g., Namecheap). Railway will provide the CNAME target.

## Development Tips
- Keep sensitive values (like DB passwords) out of the repo and use environment variables.
- If you need to change the variable names to match a hosting provider, update the connection code accordingly.
- Use `git pull --rebase origin main` before pushing to reduce merge commits when collaborating.

## Contributing
Contributions are welcome. Open an issue or submit a pull request. If your change affects deployment or environment variables, please update this README.

## License
Add a LICENSE file to choose a license (e.g., MIT) if you plan to open-source the project.
