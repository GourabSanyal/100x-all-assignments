/* eslint-disable no-unused-vars */
import { Card, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant={"outlined"}
        style={{
          width: 400,
          padding: 20,
        }}
      >
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <TextField
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <TextField
          onChange={(e) => setImage(e.target.value)}
          label="Image Link"
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <Button
          size={"large"}
          variant="contained"
          onClick={async () => {
            await axios.post(
              "http://localhost:3000/admin/courses",
              {
                title: title,
                description: description,
                imageLink: image,
                price,
                published: true,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            alert("Course added!");
          }}
        >
          Add Course
        </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
