# VidyaChain: Decentralized Trust for Academic Credentials

VidyaChain is a modern, full-stack application built to demo decentralized academic credential issuance and verification. Built for hackathon presentations, it features a premium dark-mode UI with sleek animations, and an end-to-end flow simulating a blockchain ledger.

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on default port (`mongodb://127.0.0.1:27017`)
  - *If MongoDB is not running, the backend server will start but will log a connection error.*

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev # or node server.js
```
*Runs on http://localhost:5000*

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*Runs on http://localhost:5173*


## 📖 Hackathon Demo Flow

1. **Open the App:** Navigate to `http://localhost:5173` to see the beautiful Landing Page.
2. **Register as Admin:** Click "Get Started" and create an account selecting the **"Admin / University"** role.
3. **Issue a Credential:**
   - Go to the Admin Dashboard.
   - Enter student details (e.g., Jane Doe, MIT, B.S. Computer Science).
   - **Upload a PDF or Image** (this file gets hashed via SHA-256 to simulate being stored on a blockchain).
   - Click "Issue Certificate".
4. **QR Code Verification:**
   - The system instantly generates a QR code. 
   - Open your phone's camera (or another browser tab) and navigate to the verify URL.
   - Or, copy the credential identifier and paste it on the Public Verify page.
5. **Anti-Tamper Deep Check:**
   - Once the credential is valid, use the **Deep Verification** tool to upload the original PDF.
   - It re-hashes the file and compares it to the ledger.
   - **Demo Magic:** Upload a *different* file to see the system instantly flag it with a **"HASH MISMATCH DETECTED"** error, proving the system is cryptographically secure.
