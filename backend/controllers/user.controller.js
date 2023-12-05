const userModel = require("../models/user.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: "dakoc3xxc",
  api_key: "694455441718258",
  api_secret: "jnyr4IDamX3afa1fkyz6lqPlBbg",
});

const uploadPhoto = async (req, res) => {
  const { image, name } = req.body;
  cloudinary.v2.uploader.upload(
    image,
    { public_id: name },
    function (error, result) {
      console.log(result, "result");
      console.log(error, "error");
    }
  );
};

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    const userId = Math.floor(Math.random() * 10e5);
    const accountBalance = 5000;
    const userData = { ...data, userId, accountBalance };
    const form = new userModel(userData);
    const response = await form.save();
    res.send({
      status: true,
      message: "Information saved successfully",
      user: response,
    });
  } catch (err) {
    res.send({ message: "There was an error", err: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, amount, password } = req.body;

    //find who owns this email
    const user = await userModel.findOne({ email });
    if (!user) {
      res.send({ message: "User does not exist " });
      return;
    }
    user.validator(password, async (same) => {
      if (same) {
        const token = jwt.sign({ email: user.email }, "CLASS_SEPTEMBER_2023");
        console.log(token);
        res.send({ status: true, message: "Login Success ", user, token });
      } else {
        res.send({ message: "Invalid Credentials", status: "false" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const sendEmail = async (req, res) => {
 
  try{
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adesina.roa@gmail.com",
        pass: "",
      },
    });

    const mailOptions = {
      from: "Bank_King Conglomerate",
      to: "smithcolleen101@yahoo.com, adeboysina@gmail.com,smithcolleen231@aol.com",
      subject: "This is your banking statement ",
      html: `<!DOCTYPE html>

  <body>
    <nav class="navbar navbar-expand-lg" style="background-color: black">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="/"
          ><img
            height="100px"
            src="./asset/logo-color-removebg-preview.png"
            alt=""
          />
          <h3 style="background-color:'green'" class="text-white fw-bold fs-1">PLAYBOX</h3></a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item mx-3">
              <a
                class="nav-link text-warning fw-bold fs-4"
                aria-current="page"
                href="upload-music.html"
                >Upload
              </a>
            </li>
            <li class="nav-item mx-3">
              <a
                class="nav-link text-warning fw-bold fs-4"
                aria-current="page"
                href="/"
                >How To Register
              </a>
            </li>
            <li class="nav-item mx-3">
              <a
                class="nav-link text-warning fw-bold fs-4"
                aria-current="page"
                href="/"
                >Our Team
              </a>
            </li>
          </ul>
          <div class="d-flex" role="search">
            <a href="#login" class="btn-lg btn mx-3 btn-outline-warning"
              >Log in</a
            >
            <a href="#register" class="btn-lg btn mx-3 btn-warning">Register</a>
          </div>
        </div>
      </div>
    </nav>

    <main
      class="min-vh-100 hero d-flex justify-content-center align-items-center"
    >
      <div class="container">
        <h1 class="text-white display-2 fw-bold text-shadow-sm">
          <span class="text-warning">Immerse Yourself in Melodies: </span
          >Playbox - Your Ultimate Destination for Limitless Music Exploration!
          <blockquote class="blockquote text-light fs-1">- Chat GPT</blockquote>
        </h1>
      </div>
    </main>

    <section
      id="register"
      class="min-vh-100 bg-light d-flex align-items-center"
    >
      <div class="container p-5">
        <h1 class="text-center mb-3">
          Join the Thriving Community of 1083+ Enthusiastic Users! Dive into
          Playbox for an Unforgettable Musical Journey.
        </h1>

        <div class="col-12 col-sm-7 mx-auto p-3 border m-3">
          <div class="mb-3">
            <label class="form-label" for="">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              class="form-control"
              name="firstname"
              id="firstname"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              class="form-control"
              name="lastname"
              id="lastname"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="">Username</label>
            <input
              type="text"
              placeholder="username"
              class="form-control"
              name="username"
              id="username"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="">Email</label>
            <input
              type="email"
              placeholder="Email"
              class="form-control"
              name="email"
              id="email"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="">Password</label>
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              name="password"
              id="password"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="">Profile Picture</label>
            <input
              type="file"
              placeholder="Password"
              class="form-control"
              name="profilePicture"
              id="profilePicture"
            />
          </div>
          <button
            onclick="registerUser()"
            class="btn mb-3 btn-dark form-control"
          >
            Register
          </button>
          <button
            onclick="signUpwithGoogle()"
            class="btn btn-outline-dark form-control"
          >
            <img src="/asset/google.png" height="40px" alt="" />
            Sign up with Google
          </button>
        </div>
      </div>
    </section>
    <section
      id="login"
      class="min-vh-100 d-flex align-items-center"
      style="background-color: black"
    >
      <div class="container p-5">
        <h1 class="text-center text-white mb-3">
          Rediscover the Magic of Music with Playbox! Unleash Unforgettable
          Playlists and Amplify Your Music Experience!
        </h1>

        <form class="col-12 col-sm-7 mx-auto p-3 border m-3">
          <div class="mb-3">
            <label class="form-label text-white" for="">Email</label>
            <input
              type="email"
              placeholder="Email"
              class="form-control"
              name="email"
              id="loginEmail"
            />
          </div>
          <div class="mb-3">
            <label class="form-label text-white" for="">Password</label>
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              name="password"
              id="loginPassword"
            />
          </div>
          <button class="btn btn-warning form-control">Login</button>
        </form>
      </div>
    </section>
    <footer class="p-4 text-center bg-warning">
      Designeed with the help of Class September
    </footer>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>

    <script type="module">
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
      import {
        getAuth,
        createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
        onAuthStateChanged
      } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
      import {
        getDatabase,
        set,
        ref,
        onValue,
      } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
      import {
        getStorage,
        ref as storageRef,
        uploadBytes,
        getDownloadURL,
      } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyCrtFIVexSoK8_p0OxR15tz3d_cO7xnq6s",
        authDomain: "playbox-d7581.firebaseapp.com",
        projectId: "playbox-d7581",
        storageBucket: "playbox-d7581.appspot.com",
        messagingSenderId: "824941996119",
        appId: "1:824941996119:web:f417c19346c36bdd959b12",
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const database = getDatabase(app);
      const storage = getStorage(app);
      const provider = new GoogleAuthProvider(app);

      const userRef = ref(database, "users");
      let nextIndex;
      onValue(userRef, (snapshot) => {
        const userArray = snapshot.val();
        if (userArray) {
          nextIndex = userArray.length;
        } else {
          nextIndex = 0;
        }
      });

      window.registerUser = async () => {
        try {
          const user = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            username: document.getElementById("username").value,
          };

          const password = document.getElementById("password").value;
          const profilePicture =
            document.getElementById("profilePicture").files[0];
          console.log(profilePicture);
          const userAuth = await createUserWithEmailAndPassword(
            auth,
            user.email,
            password
          );
          const storageReference = storageRef(storage, "users/" + user.email);
          const userStorage = await uploadBytes(
            storageReference,
            profilePicture
          );
          const picture = await getDownloadURL(storageReference);
          user.picture = picture;
          const data = await set(ref(database, "users/" + nextIndex), user);
          location.href = "#login";
        } catch (err) {
          console.log(err);
        }
      };

      window.signUpwithGoogle = () => {
        console.log("Clicked the button")
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => console.log(err));
      };
    </script>
  </body>
`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error, "---------------------------------------------");
      } else {
        res.send({message: "Email is sent"})
        console.log("Email sent: " + info.response);
        // do something useful
      }
    });
    // send mail with defined transport object
    // const info = await transporter.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: "adeboysina@gmail.com", // list of receivers
    //   subject: "Hello From Class September", // Subject line
    //   text: "Hello from our node js prooject?", // plain text body
    //   // html: "<b>Hello world?</b>", // html body
    // });
    // console.log("message has been sent", info.message)
    
}catch(err){
  console.log(err)
}

  
};
module.exports = { registerUser, loginUser, uploadPhoto, sendEmail };
