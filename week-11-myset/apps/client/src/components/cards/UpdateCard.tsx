import { useEffect, useState } from "react";
import { Card, TextField, Typography, Button } from "@mui/material";
import axios from "axios";

export default function UpdateCard({ course, setCourse }) {
  const cardTitle = course.title;
  const [title, setTitle] = useState(cardTitle);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);

  useEffect(() => {
    // Update the state when the course prop changes
    setTitle(course.title);
    setDescription(course.description);
    setImage(course.imageLink);
    setPrice(course.price);
  }, [course]);

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
      <Card
        variant="outlined"
        style={{
          width: 400,
          padding: 20,
        }}
      >
        <Typography style={{ marginBottom: 20 }}>
          Update course details
        </Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          fullWidth={true}
          InputLabelProps={{ shrink: true }}
        />
        <br /> <br />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <br /> <br />
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="Number"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <br /> <br />
        <TextField
          value={image}
          label="Image Link"
          onChange={(e) => setImage(e.target.value)}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <Button
          size={"large"}
          variant="contained"
          onClick={() => {
            axios.put(
              "http://localhost:3000/admin/courses/" + course._id,
              {
                title: title,
                description: description,
                imageLink: image,
                published: true,
                price,
              },
              {
                headers: {
                  // "Content-type": "application/json",
                  // Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            let updatedCourses = {
              _id: course._id,
              title: title,
              description: description,
              imageLink: image,
              price,
            };
            setCourse(updatedCourses);
          }}
        >
          Update Course
        </Button>
      </Card>
    </div>
  );
}
