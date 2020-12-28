import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector } from "react-redux";
import serverapi from "../api/serverapi";

export default function FormDialog(coord) {
  const [open, setOpen] = React.useState(true);
  const [placeName, setPlaceName] = React.useState("");
  const [placeContent, setPlaceContent] = React.useState("");
  const [authorization, setAuthorization] = React.useState(
    useSelector((state) => state.loginReducer.authorization)
  );

  const handleOk = () => {
    if (placeName === "") {
      alert("제목을 입력하세요");
    } else {
      serverapi
        .tryAddMarker(authorization, placeName, placeContent, coord.coord)
        .then((response) => {
          console.log(response);
          setOpen(false);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">장소 설명을 입력하세요</DialogTitle>
        <DialogContent>
          <DialogContentText>장소 설명을 입력하세요</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="장소 이름"
            fullWidth
            onChange={(e) => {
              setPlaceName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="설명"
            fullWidth
            multiline="true"
            onChange={(e) => {
              setPlaceContent(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleOk}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
