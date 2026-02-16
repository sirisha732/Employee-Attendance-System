Padavala Devi Durga Sireesha
Veltech University, Avadi, Chennai
9032898236
**PROJECT OVERVIEW:**
The Employee Attendance Management System is a web-based application designed to manage and track employee attendance digitally.
It eliminates manual attendance registers and provides a secure, efficient, and scalable solution using modern web technologies.
The system allows employees to mark attendance and enables administrators to monitor attendance records in real time.
**OBJECTIVES:**
1.To automate employee attendance tracking
2.To store attendance records securely in a database
3.To provide real-time access to attendance data
4.To reduce manual errors and paperwork
**TECHNOLOGIES USED:**
**1.Frontend**
HTML, CSS, JavaScript
**Backend**
Node.js, Express.js, Database, MongoDB
**Tools**
Visual Studio Code, MongoDB Compass
**System Architecture**
1.Frontend communicates with backend using REST APIs
2.Backend handles business logic and database operations
3.MongoDB stores employee and attendance data
**Features**
1.Employee Login
2.Mark Attendance (Check-in / Check-out)
3.Employee Dashboard
4.Admin Dashboard
5.Attendance Records Storage
6.Secure API-based Communication
**Prerequisites**
1.Node.js installed
2.MongoDB installed OR MongoDB Compass
**BACKEND SETUP:**
cd backend
npm install
node server.js
**OUTPUT:**
MongoDB Connected
Server running on 5000
**FRONTEND SETUP:**
cd frontend
npm install
npm start
**OUTPUT:**
Compiled successfully!
Local: http://localhost:3000
**Application URLs**
Frontend: http://localhost:3000
Backend: http://localhost:5000
**Database**
MongoDB is used for storing attendance data
Each attendance record includes:
    Employee ID
    Date
    Attendance Status
    Timestamp
**SCHEMA STRUCTURE:**
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "date": "2026-02-16",
  "checkInTime": "09:15 AM",
  "checkOutTime": "06:00 PM",
  "status": "Present",
  "totalHours": 8,
  "createdAt": "2026-02-16T09:15:00Z"
}
**USERS:**
{
  "name": "Sireesha",
  "email": "sireesha@gmail.com",
  "password": "$2b$10$abc123xyz",
  "role": "employee"
}
**Attendance:**
{
  "userId": "65d12f123abc901234",
  "date": "2026-02-16",
  "checkInTime": "09:10 AM",
  "checkOutTime": "06:05 PM",
  "status": "Present",
  "totalHours": 8
}

**Advantages**
1.Paperless attendance system
2.Accurate and reliable data
3.Easy to use interface
4.Scalable for large organizations
**Future Enhancements**
1.Face recognition attendance
2.Role-based authentication
3.Monthly attendance reports
4.Mobile application support
**Conclusion**
This project successfully demonstrates how employee attendance can be managed efficiently using a web-based system with Node.js, Express, and MongoDB.
