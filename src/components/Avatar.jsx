import React, { useState, useRef } from 'react';
import DefaultAvatar from "../assets/DefaultPFP.jpg";
import EditIcon from "../assets/edit.svg";

function Avatar() {
  const [avatarURL, setAvatarURL] = useState(DefaultAvatar);

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }

  const uploadImageDisplay = () => {
    const uploadedFile = fileUploadRef.current.files[0];
      
    const cachedURL = URL.createObjectURL(uploadedFile);
    setAvatarURL(cachedURL);

  }

  return (
    <div style={{
      height: "96px",
      width: "96px"
    }}>
      <img 
        style={{
          height: "96px",
          width: "96px"
        }}
        src={avatarURL}
        alt ="Avatar"/>

      <form id="form" encType='multipart/form-data'>
        <button
          type='submit'
          onClick={handleImageUpload}>
          <img
            src={EditIcon}
            alt="Edit"/>
        </button>
        <input 
          type="file"
          id="file"
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden />
      </form>  
    </div>
  )
};

export default Avatar;