const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const session = require('express-session');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Prevent browser caching on all routes
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Session middleware (expires in 15 mins)
app.use(session({
  secret: 'supersecretkeyhere',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set to true with HTTPS in production
    maxAge: 15 * 60 * 1000 // 15 minutes
  }
}));

// Session guard middleware
const requireLogin = (req, res, next) => {
  if (req.session && req.session.adminLoggedIn) {
    next();
  } else {
    res.redirect('/admin-register-x93K7h2Lm5B4f9Q');
  }
};

// Public Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/admin-register-x93K7h2Lm5B4f9Q', (req, res) => {
  res.render('newadmin');
});

// Secure session creation
app.post('/admin/session-login', (req, res) => {
  const { isLoggedIn } = req.body;
  if (isLoggedIn) {
    req.session.regenerate((err) => {
      if (err) {
        console.error('❌ Session regeneration error:', err);
        return res.status(500).send('Server error');
      }
      req.session.adminLoggedIn = true;
      console.log("✅ Server session created for admin.");
      res.status(200).send("✅ Session created.");
    });
  } else {
    res.status(400).send("Invalid login attempt.");
  }
});

// Logout + session destroy
app.get('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin-register-x93K7h2Lm5B4f9Q');
  });
});

// Protected Admin Routes
app.get('/admin/private/dashboard', requireLogin, (req, res) => {
  res.render('admin-dashboard');
});

app.get('/admin/private/manage-products', requireLogin, (req, res) => {
  res.render('manage-products');
});

app.get('/admin/private/view-messages', requireLogin, (req, res) => {
  res.render('view-messages');
});

app.get('/admin/private/user-activity', requireLogin, (req, res) => {
  res.render('user-activity');
});

app.get('/admin/private/reports', requireLogin, (req, res) => {
  res.render('reports');
});

app.get('/admin/private/settings', requireLogin, (req, res) => {
  res.render('admin-settings');
});

app.get('/admin/private/system-logs', requireLogin, (req, res) => {
  res.render('system-logs');
});

// Email Contact Form
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hudsonriver4151@gmail.com',
      pass: 'iaeqlgfsnmzsyomv'
    },
    tls: { rejectUnauthorized: false }
  });

  const logoURL = 'https://i.postimg.cc/7ZGbmzrt/Logo-01.png';
  const directionsURL = 'https://www.google.com/maps/search/?api=1&query=2359+Concord+Blvd,+Concord,+CA+94520';

  const mailToOwner = {
    from: email,
    to: 'joyceconnor4151@gmail.com',
    subject: `New Message from ${name}`,
    html: `
      <h3>New Contact Message - Hoffmann's Reptile</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  const mailToUser = {
    from: 'Hoffmann\'s Reptile <hudsonriver4151@gmail.com>',
    to: email,
    subject: `Thanks for contacting Hoffmann's Reptile!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <img src="${logoURL}" alt="Hoffmann's Reptile" style="width: 150px; height: auto; margin-bottom: 20px;" />
        <h2 style="color: #2e7d32;">Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We’ve received your message and will get back to you as soon as possible.</p>

        <h4>📍 Address:</h4>
        <p>2359 Concord Blvd, Concord, CA 94520</p>

        <h4>☎️ Phone:</h4>
        <p>(925) 671-9106</p>

        <h4>🕒 Store Hours:</h4>
        <ul style="line-height: 1.6;">
          <li>Thursday: 12–6:30 PM</li>
          <li>Friday: 12–6:30 PM</li>
          <li>Saturday: 10 AM–5 PM</li>
          <li>Sunday: Closed</li>
          <li>Monday: 12–6:30 PM</li>
          <li>Tuesday: 12–6:30 PM</li>
          <li>Wednesday: 12–6:30 PM</li>
        </ul>

        <a href="${directionsURL}" target="_blank" style="display: inline-block; margin-top: 20px; background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">DIRECTIONS</a>

        <p style="margin-top: 30px;">We appreciate your interest in Hoffmann’s Reptile and look forward to helping you.</p>
        <p>— The Hoffmann's Reptile Team 🐍</p>
      </div>
    `
  };

  try {
    await transporter.verify();
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToUser);
    console.log(`✅ Message sent to store + auto-reply sent to ${email}`);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.error('❌ EMAIL SEND ERROR:', error);
    res.status(500).send('Failed to send message.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Hoffmann's Reptile server running at http://localhost:${PORT}`);
});
