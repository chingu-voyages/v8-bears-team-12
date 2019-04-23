import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar-edit';
import { uploadPhoto } from './actionCreators';

const styles = {
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'space-between',
  },
};

const ProfileAvatar = ({ dispatchUploadPhoto }) => {
  const [preview, setPreview] = useState(null);
  const [src] = useState('');

  function onCrop(currView) {
    setPreview(currView);
  }

  function onClose() {
    setPreview(null);
  }

  function onBeforeFileLoad(file) {
    if (file.target.files[0].size > 300000) {
      alert('File is too big!');
      file.target.value = '';
    }
  }

  function onFileLoad(file) {
    dispatchUploadPhoto(file);
  }

  return (
    <div style={styles.avatarContainer}>
      <div>
        <img src={preview} alt="" style={{ width: '150px', height: '150px' }} />
      </div>
      <div>
        <Avatar
          width={295}
          height={200}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={src}
          onFileLoad={onFileLoad}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  dispatchUploadPhoto: uploadPhoto,
};

export default connect(
  null,
  mapDispatchToProps,
)(ProfileAvatar);
