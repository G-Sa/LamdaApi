import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
const app = express();
import { 
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} from "./controllers/propertyController.js";

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/property", async (req, res) => {
  return await listProperties(req, res);
});

app.get("/property/:id", async (req, res) => {
  return getPropertyById(req, res);
});

app.post("/property", async (req, res) => {
  return await createProperty(req, res);
});

app.put("/property/:id", async (req, res) => {
  return updateProperty(req, res);
});

app.delete("/property/:id", async (req, res) => {
  return deleteProperty(req, res);
});

app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handle = serverless(app);
