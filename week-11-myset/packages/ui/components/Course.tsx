/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

"use client";

import { Card, Typography, Button } from "@mui/material";

interface IndividualCourse {
    _id: string; // You can adjust this type as needed
    title: string;
    description: string;
    price: number;
    imageLink: string;
    published: boolean;
  };

// interface CourseCardProps {
//     course : IndividualCourse;
//     navigate: ReturnType<typeof useRouter>
// }

export function Signup(props: {
    onClick: (
    _id: string
    ) => void,
    course : IndividualCourse[]
  }) {
  
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
            {props.course.title}
          </Typography>
          <Typography textAlign={"center"} variant="subtitle1">
            {props.course.description}
          </Typography>
          {/* <img src={course.imageLink} style={{ width: 300 }}></img> */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                props.onClick(props.cours._id)
              }}
            >
              Edit
            </Button>
          </div>
        </Card>
      );
  }



// export default Course;
