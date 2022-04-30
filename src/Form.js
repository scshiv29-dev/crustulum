import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./App.css";
import Switch from "@mui/material/Switch";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { createFile } from "./apicalls";
import { Link, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function Form() {
  const location = useLocation();
  const label = { inputProps: { "aria-label": "ViewOnce" } };
  const [values, setValues] = useState({
    name: "",
    description: "",
    viewOnce: false,
    success: false,
    error: false,
  });
  const [id, setId] = useState("");
  const { name, description, viewOnce, success } = values;
  const auto_grow = (element) => {
    console.log(element);
    
    element.target.style.height = 115 + "px";
    element.target.style.height = (element.target.scrollHeight) + "px";
    
}
  const handleSubmit = (event) => {
    event.preventDefault();
    createFile(JSON.stringify(values)).then((data) => {
      if (data.errors) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,

          name: "",
          description: "",
          viewOnce: "",
          success: true,
        });
        setId(data._id);
      }
    });
  };
  const handleChange = (name) => (event) => {
    if (name === "viewOnce") {
      setValues({ ...values, [name]: !viewOnce });
    }
    setValues({ ...values, [name]: event.target.value });
  };
  const alertCopy = () => {
    alert("linked copied to clipboard");
  };
  const successMessage = () => {
    if (success) {
      return (
        <div>
          <Typography variant="h5">
            Successfully Created File with id:{id}
            <Link to={`/${id}`}>
              <span className="">See File</span>
            </Link>
          </Typography>
          <CopyToClipboard text={`${window.location.href}${id}`}>
            <Button variant="contained" color="primary" onClick={alertCopy}>
              Copy Link
            </Button>
          </CopyToClipboard>
          <Divider />
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (values.error) {
      return (
        <div>
          <Typography variant="h5">Error Creating File</Typography>
          <Divider />
        </div>
      );
    }
  };

  return (
    <>
      <Box
        onSubmit={handleSubmit}
        flexDirection="column"
        component="form"
        sx={{
          
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          minWidth: "75%",
          backgroundColor: "#a9c3f7",
          height: "100vh",
          
        }}
        noValidate
        autoComplete="off"
        className="form"
      >
      {successMessage()}
      {errorMessage()}
      
        <TextField
          value={name}
          label="Enter Title for text"
          color="secondary"
          className="textfield"
          onChange={handleChange("name")}
          sx={{marginTop: 4}}
        />
       <br/>
        <TextField
          required
          value={description}
          label="Enter The  text"
          color="secondary"
          multiline
          rows="5"
          onChange={handleChange("description")}
          className="textarea"
          onInput={(element) => auto_grow(element)}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Click Button 👉To Change Visibility</Typography>
          <Button
            color={viewOnce ? "error" : "success"}
            variant="contained"
            onClick={() => {
              setValues({ ...values, viewOnce: !viewOnce });
            }}
          >
            {viewOnce ? "View Once" : "View Forever"}
          </Button>
        </Stack>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />

        <Button type="submit" variant="contained">
          Submit
        </Button>

        <div>Share the link with your friend</div>
        <div>View Once Files Will be Deleted after first view</div>
      </Box>
    </>
  );
}
