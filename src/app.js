const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const FormEntry = require("./models/FormEntry");
const UserLogin = require("./models/UserLogin");
const session = require("express-session");
const User = require("./models/loginform");
const RegistrationForm = require("./models/RegistrationForm");
const db = require("./db/conn");;
const MongoDBStore = require('connect-mongodb-session')(session);
// Initialize MongoDB session store
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/mcd', // Your MongoDB connection URI
  collection: 'sessions',
  mongooseConnection: db, // Pass the mongoose connection to the store
});

// Catch session store errors
store.on('error', function(error) {
  console.error('MongoDB session store error:', error);
});

// Use express-session with MongoDB store
app.use(
  session({
    secret: '123456',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // Set cookie expiration time
})
);
require("./db/conn");

const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "../public");
app.use(express.static(path.join(__dirname, "../public")));
// Increase the limit to accept larger payloads
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Adjust the limit as needed
app.use(bodyParser.json({ limit: "50mb" })); // Adjust the limit as needed

app.get("/", (req, res) => {
  res.sendFile(
    path.join(staticPath, "../public/Login_register/user_login.css")
  );
});

app.post("/submitForm", (req, res) => {
  const {
    name,
    PhoneNumber,
    email,
    address,
    district,
    department,
    description,
    image,
    uploadPath,
    date,
    time,
    latitude,
    longitude,
  } = req.body;
  console.log(longitude, latitude);
  console.log(uploadPath);

  const userid = req.session.userId;
  const formEntry = new FormEntry({
    name,
    PhoneNumber,
    email,
    address,
    district,
    department,
    description,
    imagePath: image,
    uploadPath: uploadPath,
    date,
    time,
    latitude,
    longitude,
    userid: userid,
  });

  formEntry
    .save()
    .then(() => {
      console.log("Form data saved successfully");
      res.sendFile(
        path.join(staticPath, "../public/User_portal/User_Issues.html")
      );
    })
    .catch((error) => {
      console.error("Error saving form data:", error);
      res.status(500).send("Error saving form data");
    });
});

// Route to fetch data
app.get("/getData", async (req, res) => {
  try {
    const city = req.session.userCity;
    console.log(city);
    const allData = await FormEntry.find();
    const filteredData = allData.filter((entry) => entry.district === city);
    if (!filteredData || filteredData.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});
app.get("/UserIssueData", async (req, res) => {
  try {
    const city = req.session.userCity;
    //   console.log(city);
    const allData = await FormEntry.find();
    const filteredData = allData.filter((entry) => entry.district === city);
    if (!filteredData || filteredData.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/getAcceptData", async (req, res) => {
  try {
    const city = req.session.Admincity;
    const department = req.session.department;
    const allData = await FormEntry.find();
    const filteredData = allData.filter(
      (entry) => entry.district === city && entry.department === department
    );
    if (!filteredData || filteredData.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});
app.get("/getLocation", async (req, res) => {
  try {
    const city = req.session.Admincity;
    const department = req.session.department;
    const allData = await FormEntry.find();
    const filteredData = allData.filter(
      (entry) => entry.district === city && entry.department === department
    );

    if (!filteredData || filteredData.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});
app.get('/getAdminData', async (req, res) => {
  try {

    console.log(req.session.department+"getAdminData"+req.session.Admincity);
    const city = req.session.Admincity;
    const department = req.session.department;
    const allData = await FormEntry.find();
    const filteredData = allData.filter(entry => entry.district === city && entry.department === department);

    if (!filteredData || filteredData.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// app.get('/getUserData', async (req, res) => {
//     try {
//         // Check if user is logged in
//         if (!req.session.phoneNumber) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }

//         // Get the logged-in user's phone number from the session
//         const userid = req.session.id;

//         // Fetch all data from the database
//         const allData = await FormEntry.find();

//         // Filter the data to include only entries matching the logged-in user's phone number
//         const filteredData = allData.filter(entry => entry.id === userid);

//         if (!filteredData || filteredData.length === 0) {
//             return res.status(404).json({ error: 'No data found' });
//         }

//         res.json(filteredData);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Error fetching data');
//     }
// });

app.get("/getUserData", async (req, res) => {
  try {
    // Fetch all data from the database
    const allData = await FormEntry.find();
    const userid = req.session.userId;
    // console.log("sir apkki id " + userid);

    const filteredData = allData.filter((entry) => entry.userid === userid);
    console.log(filteredData);
    if (!filteredData || filteredData.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/getDetailsById", (req, res) => {
  const cardId = req.query.id;
  FormEntry.findById(cardId)
    .then((entry) => {
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.json(entry);
    })
    .catch((err) => res.status(500).json({ message: "Internal server error" }));
});

// Registration page ka route
app.post("/UserLogin", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      PhoneNumber,
      dob,
      gender,
      address,
      district,
      state,
      country,
      pinCode,
      password,
      uniqueId,
    } = req.body;

    const newUser = new UserLogin({
      firstName,
      lastName,
      email,
      PhoneNumber,
      dob,
      gender,
      address,
      district,
      state,
      country,
      pinCode,
      password,
      uniqueId,
    });
    // Save the user to the database
    await newUser.save();
    // res.status(201).send("User registered successfully!");
    res.sendFile(path.join(staticPath, "../public/User_portal/user_home.html"));
    const city = newUser.district;
    // req.session.city = city;
    req.session.userCity = city;
    req.session.userId = newUser.uniqueId;
  } catch (error) {
    console.error("Error registering user:", error);
    // res.status(500).send('Error registering user');
    res.sendFile(
      path.join(__dirname, "../public/Login_register/user_login.html")
    );
  }
});
//  LOGIN VALIDATION
app.post("/Login", async (req, res) => {
  try {
    const { email, password, captchaInput, captcha } = req.body;

    // Find the user in the database based on the provided email
    const user = await UserLogin.findOne({ email });

    // If the user is not found or the password doesn't match, show an error alert
    if (!user || user.password !== password) {
      return res.send(
        '<script>alert("Invalid email or password"); window.location.href = "/";</script>'
      );
    } else if (captchaInput !== captcha) {
      return res.send(
        '<script>alert("Invalid captcha"); window.location.href = "/";</script>'
      );
    }
    const city = user.district;
    req.session.userId = user.uniqueId;
    req.session.userCity = city;
    res.sendFile(path.join(staticPath, "../public/User_portal/user_home.html"));
  } catch (error) {
    console.error(error);
    // return res.status(500).send('Internal Server Error');
    res.sendFile(
      path.join(__dirname, "/public/Login_register/user_login.html")
    );
  }
});

// Adminfunctionality
app.post("/AdminsubmitForm", async (req, res) => {
  const { id, choice, reason } = req.body; // Changed complete to completeStatus

  try {
    if (id && choice) {
      // If ID and choice are provided, update choices
      const entry = await FormEntry.findById(id);
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }

      // Update the choices based on the request
      if (choice === "accept") {
        entry.accept = true;
        entry.reject = false;
        entry.hold = false;
      } else if (choice === "reject") {
        entry.accept = false;
        entry.reject = true;
        entry.hold = false;
        entry.reason = reason; // Set the reason for rejection
      } else if (choice === "hold") {
        entry.accept = false;
        entry.reject = false;
        entry.hold = true;
        entry.reason = reason; // Set the reason for holding
      }

      // if (completeStatus) { // Changed complete to completeStatus
      //     // If completeStatus is true, set completeStatus and CompleteDate
      //     entry.remark = remark;
      //     entry.completeStatus = true;
      //     entry.CompleteDate = new Date();
      // }

      // Save the updated entry
      await entry.save();

      return res.json({ message: "Choices updated successfully" });
    } else {
      // If ID and choice are not provided, save form data
      const {
        name,
        phone,
        email,
        address,
        city,
        description,
        image,
        uploadPath,
        date,
        time,
        latitude,
        longitude,
      } = req.body;

      const formEntry = new FormEntry({
        name,
        phone,
        email,
        address,
        city,
        description,
        imagePath: image,
        uploadPath,
        date,
        time,
        latitude,
        longitude,
      });

      await formEntry.save();
      console.log("Form data saved successfully");
      return res.sendFile(path.join(staticPath, "index.html"));
    }
  } catch (error) {
    console.error("Error processing form data:", error);
    return res.status(500).json({ message: "Error processing form data" });
  }
});

app.post("/submitRemark", async (req, res) => {
  const { id, remark, dateTime, complete, completefile } = req.body;

  try {
    // Find the form entry by ID
    const entry = await FormEntry.findById(id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // Update the entry with the remark, date, and completion status
    entry.remark = remark;
    entry.dateTime = dateTime;
    entry.complete = complete;
    entry.completefile = completefile;
    // Save the updated entry
    await entry.save();

    // Respond with success message
    return res.json({ message: "Remark submitted successfully" });
  } catch (error) {
    console.error("Error submitting remark:", error);
    return res.status(500).json({ message: "Error submitting remark" });
  }
});
app.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const { Email, Phone, Address, district, department, State, country, PinCode, password, C_password } = req.body;


    // Check if passwords match
    if (password !== C_password) {
      return res.status(400).send('Passwords do not match');
    }

    // Check if user with same email already exists
    const existingUser = await RegistrationForm.findOne({ Email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    const newRegistrationForm = new RegistrationForm({ Email, Phone, Address, district, department, State, country, PinCode, password, C_password });
    await newRegistrationForm.save();

    // Store the city in session or cookie for future use
    req.session.Admincity = district;  // Assuming you're using sessions
    req.session.department = department; // Assuming you're using sessions
    console.log(req.session.Admincity + " register" + req.session.department);
    res.sendFile(path.join(__dirname, "../public/Admin_department_office/Admin_home_problems.html"));
  } catch (error) {
    console.error(error);
    res.sendFile(path.join(__dirname, "../public/Login_register/AdminLogin.html"));
  }
});
app.post("/Adminlogin", async (req, res) => {
  try {
      const { Email, password } = req.body;
      const user = await RegistrationForm.findOne({ Email });
      
      if (!user) {
          return res.status(401).json({ message: 'Invalid Credentials' });
      }
      if ( user.password !== password) {
          return res.send('<script>alert("Invalid username or password!!"); window.location.href = "/";</script>');
      }
      
      
      const city = user.district;
      req.session.department = user.department; 
      req.session.Admincity = city;
      console.log(req.session.department+"login"+req.session.Admincity)
   
      res.sendFile(path.join(__dirname, "../public/Admin_department_office/Admin_home_problems.html"));
  } catch (error) {
      console.error(error);
      // return res.status(500).send('Internal Server Error');
      res.sendFile(path.join(__dirname, "../public/Login_register/AdminLogin.html"));

  }
});



const nodemailer = require('nodemailer');

 app.post('/sendemail', (req, res) => {
    const { name, email, message , msg} = req.body;

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vbabita872@gmail.com',
            pass: 'uuytqstyrldtotcj'
        }
    });

    // Setup email data
    const mailOptions = {
        from: 'vbabita872@gmail.com',
        to: email,
        subject: 'Nagar Sarthi Update',
        text: `Name : ${name}\nEmail: ${email}\n ${message}`,
        html:`
        <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Completed</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 80%;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #4CAF50;
        color: white;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 2.5em;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content p {
        font-size: 1.2em;
        color: #333;
      }
      .content .celebrate {
        margin-top: 20px;
        font-size: 1.5em;
        color: #ff6f61;
        animation: celebration 1s infinite alternate;
      }
      @keyframes celebration {
        0% { transform: scale(1); }
        100% { transform: scale(1.1); }
      }
      .footer {
        background-color: #4CAF50;
        color: white;
        text-align: center;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Nagar Sarthi Update</h1>
      </div>
      <div class="content">
        <p>Hello, ${name}</p>
        <p>We are thrilled to inform you that your issue that you have raised has been ${msg}.</p>
        <p class="celebrate">🎉 ${msg}! 🎉</p>
        <p>If you have any further questions or need additional assistance, please do not hesitate to reach out.</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Nagar Sarthi. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
     }
});
console.log("Email Sent Succesfull!!");
});


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
