# Mini Dating App Backend

This is a backend MVP for a dating app using Node.js, Express, MongoDB, and mocked Firebase.

---

### 1) Register:

*Registers a new user with basic details.*

**API:** `POST http://localhost:5000/api/auth/register`  
**Screenshot:**  
<img width="891" height="642" alt="register" src="https://github.com/user-attachments/assets/f33a4191-3f2f-4478-8fe8-96afa549ff40" />

---

### 2) Login:

*Logs in a user and returns a JWT token.*

**API:** `POST http://localhost:5050/api/auth/login`  
**Screenshot:**  
<img width="873" height="652" alt="Screenshot 2025-08-02 at 4 24 37 PM" src="https://github.com/user-attachments/assets/c9d257f3-0548-4914-be87-d11d346be960" />

---

### 3) Create / Update Profile:

*Sets up or updates profile details including preferences and location.*

**API:** `PUT http://localhost:5050/api/profile/setup`  
**Screenshot:**  
<img width="1057" height="777" alt="Screenshot 2025-08-02 at 5 17 16 PM" src="https://github.com/user-attachments/assets/c578eb5e-ca4a-4a75-ab6d-667d180d0056" />

---

### 4) Upload Profile Picture:

*Uploads a profile picture for the logged-in user.*

**API:** `PUT http://localhost:5050/api/profile/upload-picture`  
**Screenshot:**  
<img width="1045" height="792" alt="Screenshot 2025-08-02 at 4 40 08 PM" src="https://github.com/user-attachments/assets/c33fa30c-e946-4ce5-bcb3-ff2a1c662472" />  
*Then this image gets added in the `uploads` folder.*

---

### 5) Get My Profile:

*Fetches the logged-in user's profile details.*

**API:** `GET http://localhost:5050/api/profile/me`  
**Screenshot:**  
<img width="1037" height="773" alt="Screenshot 2025-08-02 at 4 45 36 PM" src="https://github.com/user-attachments/assets/47fe07d8-f202-4aeb-8068-6d7f63eaea5c" />

---

### 6) Get Matches:

*Returns potential matches based on gender, age, and location.*

**API:** `GET http://localhost:5050/api/profile/matches`  
**Screenshot:**  
<img width="1042" height="775" alt="Screenshot 2025-08-02 at 5 32 14 PM" src="https://github.com/user-attachments/assets/73546ba6-93d0-4366-9ac9-a9d503bd7bfd" />

---

### 7) Get Mutual Matches:

*Shows mutual matches where both users liked each other.*

**API:** `GET http://localhost:5050/api/profile/mutual`  
**Screenshot:**  
<img width="1054" height="784" alt="Screenshot 2025-08-02 at 4 54 35 PM" src="https://github.com/user-attachments/assets/e38a8a81-ae42-422a-9de4-c2cb0a5e07f6" />

---

### 8) Like a User:

*Likes another user. If mutual, a match is created and a mock notification is sent.*

**API:** `POST http://localhost:5050/api/interact/like/<targetUserId>`  
**Screenshot:**  
<img width="1004" height="757" alt="Screenshot 2025-08-02 at 5 42 23 PM" src="https://github.com/user-attachments/assets/95f3fe72-dde3-4c9c-8e60-16221fa5e271" />  
<img width="897" height="205" alt="Screenshot 2025-08-02 at 5 44 57 PM" src="https://github.com/user-attachments/assets/0511b0a3-a482-4352-aa7f-2ceb7f81994b" />  
*As you can see here in the VSCode console, we got the mock notification as two users liked each other.*

---

### 9) Dislike a User:

*Dislikes a user to remove them from future match suggestions.*

**API:** `POST http://localhost:5050/api/interact/dislike/<targetUserId>`

---

## Setup Instructions

1. Clone or unzip this project
2. Run `npm install`
3. Create a `.env` file based on `.env.example`
4. Run `npm start`

---
