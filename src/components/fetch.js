import React, { useReducer, useState } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteAction, fetchAction } from "./action";
import FormDialog from "./fetch1";
import FormEditDialog from "./fetch2";

const MyComponent = () => {
  const [fetchClicked, setFetchClicked] = useState(false);

  const { fetchData } = useSelector((state) => state);
  const { addData } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleFetchData = () => {
    axios
      .get("https://fakestoreapi.com/users")
      .then((response) => dispatch(fetchAction(response.data)));
    setFetchClicked(true);
  };
  const handleDeleteData = (id) => {
    axios
      .delete(`https://fakestoreapi.com/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedData = fetchData.flat().filter((user) => user.id !== id);
          dispatch(deleteAction(updatedData));
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  

  return (
    <div>
      <h1>{console.log(fetchData, "FFFFFFFFFFFFFFF")}</h1>
      <Button
        onClick={handleFetchData}
        variant="contained"
        color="primary"
        sx={{ marginLeft: 2 }}
      >
        FETCH
      </Button>
      {fetchClicked && (
        <TableContainer
          component={Paper}
          sx={{
            width: "72%",
            marginLeft: 23,
            marginTop: 4,
            // border: "1px solid black",
          }}
        >
          <Table
            sx={{ border: "1px solid black" }}
            aria-label="simple table"
          ></Table>
          <TableHead>
            <TableRow>
              <TableCell>ID's</TableCell>
              <TableCell>USERNAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PASSWORD</TableCell>
              <TableCell>PHONE</TableCell>
              <TableCell>DELETE</TableCell>
              <TableCell>EDIT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchData.flat().map((val) => {
              return (
                <TableRow>
                  <TableCell>{val.id}</TableCell>
                  <TableCell>{val.username}</TableCell>
                  <TableCell>{val.email}</TableCell>
                  <TableCell>{val.password}</TableCell>
                  <TableCell>{val.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        handleDeleteData(val.id);
                      }}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                  <TableCell><FormEditDialog val={val} fetchData={fetchData.flat()} id={val.id} /></TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>
                <FormDialog fetchData={fetchData.flat()} addData={addData} />
              </TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      )}
    </div>
  );
};
export default MyComponent;
