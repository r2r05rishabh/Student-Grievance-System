const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");
const Department = require("../model/deptSchema");
const Complaint = require("../model/complaintSchema");

router.get("/", (req, res) => {
  res.send(`Hello world from the server rotuer js`);
});

router.post("/register", async (req, res) => {
  const {
    name,
    email,
    admissionno,
    phone,
    branch,
    semester,
    password,
    cpassword,
  } = req.body;

  if (
    !name ||
    !email ||
    !admissionno ||
    !phone ||
    !branch ||
    !semester ||
    !password ||
    !cpassword
  ) {
    return res.status(422).json({ error: "Plz filled the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({
        name,
        email,
        admissionno,
        phone,
        branch,
        semester,
        password,
        cpassword,
      });
      await user.save();
      res.status(201).json({ message: "user registered successfuly" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login route

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz Filled the data" });
    }

    const userLogin = await User.findOne({ email: email });

    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials " });
      } else {
        // need to genereate the token and stored cookie after the password match
        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.json({ message: "user Signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials " });
    }
  } catch (err) {
    console.log(err);
  }
});

// about us  page

router.get("/about", authenticate, (req, res) => {
  console.log(`Hello my About`);
  res.send(req.rootUser);
});

// get user data for contact us and home page
router.get("/getdata", authenticate, (req, res) => {
  console.log(`Hello my About`);
  res.send(req.rootUser);
});

// contact us

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "plzz filled the contact form " });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(201).json({ message: "user Contact successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// logout

router.get("/logout", (req, res) => {
  console.log(`Hello my Logout Page`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User lOgout");
});

router.get("/test", (req, res) => {
  res.send("test route");
});

// add department
router.post("/department", (req, res) => {
  const { deptName, email, password, cpassword } = req.body;
  if (!deptName || !email || !password || !cpassword) {
    res.status(422).json({ error: "please fill the field correctly" });
  } else {
    Department.findOne({ deptName: deptName }).then((departmentExist) => {
      if (departmentExist) {
        res.status(422).json({ error: "department allready exist" });
      } else {
        const department = new Department({
          deptName,
          email,
          password,
          cpassword,
        });
        department
          .save()
          .then(() => {
            res
              .status(201)
              .json({ message: "Department Registered Successfully" });
          })
          .catch((error) =>
            res.status(500).json({ message: "Failed to registered" })
          );
      }
    });
  }
});

// department Login



router.post("/loginDepartment", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "data not filled properly" });
    }

    const deptData = await Department.findOne({ email: email });
    if(password==deptData.password)
      res.send({"login" : true});
    else
    res.send({"login" : false});
  } catch (err) {
    console.log(err);
  }
});




// Register complaint

router.post("/registerComplaint", async (req, res) => {
  const {
    cmptid,
    name,
    email,
    admissionno,
    phone,
    branch,
    semester,
    complaint,
  } = req.body;

  if (
    !cmptid ||
    !name ||
    !email ||
    !admissionno ||
    !phone ||
    !branch ||
    !semester ||
    !complaint
  ) {
    return res.status(422).json({ error: "Plz filled the field properly" });
  }

  try {
      const complain = new Complaint({
        cmptid,
        name,
        email,
        admissionno,
        phone,
        branch,
        semester,
       complaint
      });
      await complain.save();
      res.status(201).json({ message: "complaint registered successfuly" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/viewStatus", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Plz Filled the data" });
    }

    const userData = await Complaint.findOne({ email: email });
    res.send(userData);
  } catch (err) {
    console.log(err);
  }
});

router.post("/viewStatusDept", async (req, res) => {
  try {
    const { dept } = req.body;

    if (!dept) {
      return res.status(400).json({ error: "Plz Filled the data" });
    }

    const userData = await Complaint.find({ branch: dept });
    res.send(userData);
  } catch (err) {
    console.log(err);
  }
});

// updating status

router.patch("/updateStatus", async (req, res) => {
  try {
    const { email, complaintStatus } = req.body;
    console.log(req.body);

    if (!email) {
      return res.status(400).json({ error: "Plz Filled the data" });
    }

    const userData = await Complaint.findOne({ email: email });
    console.log(userData.complaintStatus);
    userData.complaintStatus = complaintStatus;
    console.log(userData.complaintStatus);
    const result = await Complaint.save();
    console.log(result);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/viewStudent", async (req, res) => {

  const userData = await User.find();
  res.send(userData);
});

router.get("/viewStatusAdm", async (req, res) => {

  const userData = await Complaint.find();
  res.send(userData);
});

router.get("/viewDepartment", async (req, res) => {

  const userData = await Department.find();
  res.send(userData);
});

module.exports = router;
