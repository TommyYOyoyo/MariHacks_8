import React, { useState, useRef } from 'react';
import DefaultAvatar from "../../assets/DefaultPFP.jpg";
import EditIcon from "../../assets/edit.svg"

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
      position:'relative',
      
      margin: "8px"
    }}>
      <img 
        style={{
          height: '96px',
          width: '96px',
          borderRadius:'9999px'
        }}
        src={avatarURL}
        alt ="Avatar"/>

      <form id="form" encType='multipart/form-data'>
        {/* <input type='image' src={EditIcon} onClick={handleImageUpload} style={{
          height: '25px',
          width: '25px'
        }} /> */}
        <button
          style={{
            height: '25px',
            width: '25px',
            alignSelf:'center',
            position: 'absolute',
            borderRadius:'9999px'
          }}
          type='submit'
          onClick={handleImageUpload}>
          <img
            src={EditIcon}
            alt="Edit"
            style={{
              objectFit:'cover'
            }}/>
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