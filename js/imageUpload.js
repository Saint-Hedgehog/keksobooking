'use strict';

const DEFAULT_AVATAR_SRC = `img/muffin-grey.svg`;
const ALT_TEXT = `Фотография жилья`;

const stylesToPreview = {
  images: {
    default: {
      width: `40px`,
      height: `44px`,
      borderRadius: `0`,
      marginLeft: `0`,
    },
    edited: {
      width: `70px`,
      height: `70px`,
      borderRadius: `5px`,
      marginLeft: `-15px`,
    },
  }
};

const {adForm} = window.validation;

const avatarFileName = adForm.querySelector(`#avatar`);
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);

const houseImagesInput = adForm.querySelector(`#images`);
const examplePhotoContainer = adForm.querySelector(`.ad-form__photo`);
const photoContainer = document.querySelector(`.ad-form__photo-container`);

// Загружаем вашу фотографию (для карты)
const uploadAvatar = (file) => {
  const editedStyle = stylesToPreview.images.edited;

  const onAvatarUpload = () => {
    URL.revokeObjectURL(avatarPreview.src);
    avatarPreview.removeEventListener(`load`, onAvatarUpload);
  };

  avatarPreview.addEventListener(`load`, onAvatarUpload);
  avatarPreview.src = URL.createObjectURL(file);

  avatarPreview.setAttribute(`width`, editedStyle.width);
  avatarPreview.setAttribute(`height`, editedStyle.height);

  avatarPreview.style.width = editedStyle.width;
  avatarPreview.style.height = editedStyle.height;
  avatarPreview.style.borderRadius = editedStyle.borderRadius;
  avatarPreview.style.marginLeft = editedStyle.marginLeft;
  avatarPreview.style.objectFit = `cover`;
};

// Фотография жилья
const uploadImage = (fileName) => {
  const divContainer = document.createElement(`div`);
  divContainer.classList.add(`ad-form__photo`);
  photoContainer.appendChild(divContainer);
  const imageElement = document.createElement(`img`);
  const editedStyle = stylesToPreview.images.edited;

  const onImageLoad = () => {
    URL.revokeObjectURL(imageElement.src);
    imageElement.removeEventListener(`load`, onImageLoad);
  };

  imageElement.addEventListener(`load`, onImageLoad);
  imageElement.src = URL.createObjectURL(fileName);

  imageElement.setAttribute(`alt`, ALT_TEXT);
  imageElement.setAttribute(`width`, editedStyle.width);
  imageElement.setAttribute(`height`, editedStyle.height);

  imageElement.style.width = editedStyle.width;
  imageElement.style.height = editedStyle.height;
  imageElement.style.borderRadius = editedStyle.borderRadius;
  imageElement.style.objectFit = `cover`;

  examplePhotoContainer.remove();
  divContainer.appendChild(imageElement);
};

const onAvatarFileNameChange = () => {
  uploadAvatar(avatarFileName.files[0]);
};

const onHouseImagesInputChange = () => {
  uploadImage(houseImagesInput.files[0]);
};

const setEnabled = () => {
  avatarFileName.addEventListener(`change`, onAvatarFileNameChange);
  houseImagesInput.addEventListener(`change`, onHouseImagesInputChange);
};

const setDisabled = () => {
  const defaultStyle = stylesToPreview.images.default;

  avatarPreview.style.width = defaultStyle.width;
  avatarPreview.style.height = defaultStyle.height;
  avatarPreview.style.borderRadius = defaultStyle.borderRadius;
  avatarPreview.style.marginLeft = defaultStyle.marginLeft;
  avatarPreview.src = DEFAULT_AVATAR_SRC;

  const removePhotoContainers = adForm.querySelectorAll(`.ad-form__photo`);
  removePhotoContainers.forEach((removePhotoContainer) => {
    removePhotoContainer.remove();
  });
  photoContainer.appendChild(examplePhotoContainer);

  avatarFileName.removeEventListener(`change`, onAvatarFileNameChange);
  houseImagesInput.removeEventListener(`change`, onHouseImagesInputChange);
};

window.imageUpload = {
  setDisabled,
  setEnabled,
};
