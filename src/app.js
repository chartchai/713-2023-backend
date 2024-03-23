const express = require('express');
const cors = require('cors');
const testRoutes = require('./routes/testRoutes');
const eventRoutes = require('./routes/eventDbAsyncRoutes');
const participantRoutes = require('./routes/participantRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const authRoutes = require('./routes/authRoutes');
const multer = require('multer');
const bucket = require('./config/firebaseAdminInit'); // Path to your Firebase init file
const upload = multer({ storage: multer.memoryStorage() });
const app = express();
app.use(express.json());
app.use(cors());
// Define a route for the root path ("/")
app.use('/test', testRoutes);
app.use('/events', eventRoutes);
app.use('/participants', participantRoutes);
app.use('/organizers', organizerRoutes)
app.use('/api/v1/auth', authRoutes);

app.post('/uploadImage', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).send({ message: err.message });
  });

  blobStream.on('finish', () => {
    blob.makePublic().then(() => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).send({ fileName: req.file.originalname, name: publicUrl });
    })
  });

  blobStream.end(req.file.buffer);
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
port = 8080
// Start the server and listen on port 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});


