import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalImage = (props) => {

const {open,setOpen,imageUrl}=props
const toggle=()=>{
    setOpen(!open)
}
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
            <img src={imageUrl} width="100%" height="80%"/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalImage;
