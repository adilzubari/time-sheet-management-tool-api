import express from "express";
import mongoose from "mongoose";
import Credentials from "./credentials.js";
import cors from "cors";

// Schemas
import user from "./schemas/user.js";
import level from "./schemas/level.js";
import wbs from "./schemas/wbs.js";
import task from "./schemas/task.js";
import workflow from "./schemas/workflow.js";
import progress from "./schemas/progress.js";

// App Config
const app = express();

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
const port = process.env.port || 3000;
const connection_url =
  "mongodb+srv://adil:" +
  Credentials.password +
  "@cluster0.4cdpy.mongodb.net/" +
  Credentials.database +
  "?retryWrites=true&w=majority";

// Middlewares

// DB Config
mongoose.connect(connection_url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
});

// API Endpoints
app.get("/", (req, res) => {
  res.send("Happy Time Sheet Managing!");
});

app.get("/get/users", (req, res) => {
  user.find((err, values) => {
    res.send(values);
  });
});

app.get("/get/users/admin", (req, res) => {
  user.find({ Role: "admin" }, (err, values) => {
    res.send(values);
  });
});

app.get("/get/users/viewer", (req, res) => {
  user.find({ Role: "viewer" }, (err, values) => {
    res.send(values);
  });
});

app.get("/get/users/employee", (req, res) => {
  user.find({ Role: "employee" }, (err, values) => {
    res.send(values);
  });
});

app.get("/get/levels", (req, res) => {
  level.find((err, values) => {
    res.send(values);
  });
});

app.get("/get/projects", (req, res) => {
  wbs.find((err, values) => {
    res.send(values);
  });
});

app.post("/get/projects", (req, res) => {
  const Data = req.body;
  wbs.find(Data, (err, values) => {
    res.send(values);
  });
});

app.get("/get/wbs", (req, res) => {
  wbs.find((err, values) => {
    res.send(values);
  });
});

app.get("/get/tasks", (req, res) => {
  task.find((err, values) => {
    res.send(values);
  });
});

app.get("/get/progress", (req, res) => {
  progress.find((err, values) => {
    res.send(values);
  });
});

app.get("/get/workflow", (req, res) => {
  workflow.find((err, values) => {
    res.send(values);
  });
});

app.post("/get/workflow", (req, res) => {
  const Data = req.body;
  workflow.find(Data, (err, values) => {
    res.send(values);
  });
});

app.post("/auth", (req, res) => {
  const Data = req.body;
  // res.send(Data);
  // return;
  user.findOne(Data, (err, values) => {
    // const a = JSON.stringify(values);
    // res.send(Object.entries(values));
    // return;
    if (err) res.status(500).send();
    else res.send(values);
  });
});

app.post("/workflow/create", (req, res) => {
  const Data = req.body;
  workflow.create(Data, (err, values) => {
    if (!err) res.send(values._id);
  });
});

app.post("/workflow/delete", (req, res) => {
  const Data = req.body;
  workflow.deleteOne(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/progress/create", (req, res) => {
  const Data = req.body;
  progress.create(
    {
      Workflow_id: Data.Workflow_id,
      Progress: Data.Progress,
    },
    (err, values) => {
      if (!err) res.send("ok");
    }
  );
});

app.post("/progress/update", (req, res) => {
  const Data = req.body;
  progress.updateOne(
    {
      Workflow_id: Data.Workflow_id,
    },
    {
      ...Data.Progress,
    },
    (err, values) => {
      if (!err) res.send("ok");
    }
  );
});

app.post("/progress/delete", (req, res) => {
  const Data = req.body;
  progress.deleteOne(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/user/create", (req, res) => {
  const Data = req.body;
  user.create(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/user/delete", (req, res) => {
  const Data = req.body;
  user.deleteOne(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/user/edit", (req, res) => {
  const Data = req.body;
  user.updateOne({ _id: Data._id }, Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/level/create", (req, res) => {
  const Data = req.body;
  // res.send(Body);
  // return;
  level.create(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/level/delete", (req, res) => {
  const Data = req.body;
  level.deleteOne(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/wbs/create", (req, res) => {
  const Data = req.body;
  // res.send(Body);
  // return;
  wbs.create(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/wbs/delete", (req, res) => {
  const Data = req.body;
  wbs.deleteOne(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/task/create", (req, res) => {
  const Data = req.body;
  task.create(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.post("/task/delete", (req, res) => {
  const Data = req.body;
  task.deleteOne(Data, (err, values) => {
    if (!err) res.send("ok");
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
