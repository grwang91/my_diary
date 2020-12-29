import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import { setMarkerToInput, setAskMark, setCoord } from "../actions/loadActions";

export default function AlertDialog(coord) {
  const dispatch = useDispatch();

  const handleClickYes = () => {
    setMarkerToInput(dispatch, true);
    setCoord(dispatch, coord.coord);
  };

  const handleClose = () => {
    setMarkerToInput(dispatch, false);
    setAskMark(dispatch, false);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"마커에 추가하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            해당 장소를 마커에 추가하시려면 YES 눌러주세요
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={handleClickYes} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
