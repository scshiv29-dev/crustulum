import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteFile, getFile } from "./apicalls";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export default function Pasted() {
  const id = useParams();
  const [values, setValues] = useState({
    name: "",
    description: "",
    viewOnce: false,
    success: false,
    error: false,
    reload: false,
  });
  const { name, description, viewOnce} = values;
  const preLoad = (id) => {
    getFile(id)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: true });
        } else {
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            viewOnce: data.viewOnce,
          });
          deleteFile(id);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preLoad(id.id);
  }, []);
  return (
    <div>
      {" "}
      <ResponsiveAppBar />
      <Div>
        <Typography variant="h5">File Title: {name}</Typography>
        <Typography variant="h5">File Description : {description}</Typography>
        {values && viewOnce ? (
          <Typography variant="h5">
            The file will be deleted after this view (reload to check it
            yourself 😉)
          </Typography>
        ) : (
          <Typography variant="h5">
            You Can Visit This File as long as the site exists 👽
          </Typography>
        )}
      </Div>
    </div>
  );
}
