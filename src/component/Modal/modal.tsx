import React from "react";
import { complainceReport } from "../../assets/constant/modalConst";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { JsonViewer } from "../JsonViewer/jsonViewer";

interface ModalInferface{
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const ModalPopUP: React.FC<ModalInferface> = ({open, handleClose}) => {

    return (
        <>
        <Dialog
        open={open}
        fullWidth={open}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Report"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <JsonViewer data={complainceReport} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="small" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      </>
    );

}