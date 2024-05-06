import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addAction, editAction } from "./action";
import { useDispatch, useSelector } from "react-redux";

export default function FormEditDialog({ fetchData,val,id}) {
let {editData}=useSelector((state)=>state)
  const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    id: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleOnchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleClickOpen = () => {
    setState({id:val.id,
        username:val.username,
        email:val.email,
        password:val.password,
        phone:val.phone})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var index = fetchData.findIndex(item => item.id === val.id);
    fetchData.splice(index,1,state)
    dispatch(editAction(fetchData))
    console.log(fetchData,"DDDDDDDDDDD");
    handleClose();
  };
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        sx={{ width: 40, margin: 2 }}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>setDetails</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your id,useranme,email,password,phone and address
            here.We will updates the given table.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="id"
            name="id"
            label="id"
            type="id"
            fullWidth
            value={state.id}
            variant="standard"
            onChange={handleOnchange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="username"
            type="username"
            fullWidth
            value={state.username}
            onChange={handleOnchange}
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={state.email}
            variant="standard"
            onChange={handleOnchange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={state.password}
            onChange={handleOnchange}
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Phone No"
            type="number"
            fullWidth
            value={state.phone}
            onChange={handleOnchange}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">ADD</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
