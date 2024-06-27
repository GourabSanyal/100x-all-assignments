import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Button } from "@mui/material";

type Course = {
  _id: string; // You can adjust this type as needed
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

type CourseProps = {
  course: {
    _id: string; // You can adjust this type as needed
    title: string;
    description: string;
    price: number;
    imageLink: string;
    published: boolean;
  };
};

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  const getData = async () => {
    const response = await axios.get("/api/auth/courses", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    const data = response.data;
    setCourses(data);
  };

  useEffect(() => {
    getData();
  }, [router]);

  if (!courses.length) {
    <div>Loading Courses ...</div>;
  }

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course: Course) => {
        return <Course key={course._id} course={course} />;
      })}
    </div>
  );
}

function Course({ course }: CourseProps) {
  const router = useRouter();
  let courseId = course._id;
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }}></img>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            router.push("/admin/" + courseId);
            // console.log(course._id)
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}
