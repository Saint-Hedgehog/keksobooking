'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
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

// Проверяем файл на соответствие читаемого типа
const fileChooser = (file, onCheckPassed) => {
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    onCheckPassed(file);
  }
};

const xxx = function (element) {
  const editedStyle = stylesToPreview.images.edited;
  element.setAttribute(`width`, editedStyle.width);
  element.setAttribute(`height`, editedStyle.height);

  element.style.width = editedStyle.width;
  element.style.height = editedStyle.height;
  element.style.borderRadius = editedStyle.borderRadius;
  element.style.objectFit = `cover`;
};

// Загружаем вашу фотографию (для карты)
const uploadAvatar = (file) => {
  const editedStyle = stylesToPreview.images.edited;

  const onAvatarUpload = () => {
    URL.revokeObjectURL(avatarPreview.src);
    avatarPreview.removeEventListener(`load`, onAvatarUpload);
  };

  avatarPreview.addEventListener(`load`, onAvatarUpload);
  avatarPreview.src = URL.createObjectURL(file);

  xxx();
  // avatarPreview.setAttribute(`width`, editedStyle.width);
  // avatarPreview.setAttribute(`height`, editedStyle.height);

  // avatarPreview.style.width = editedStyle.width;
  // avatarPreview.style.height = editedStyle.height;
  // avatarPreview.style.borderRadius = editedStyle.borderRadius;
  avatarPreview.style.marginLeft = editedStyle.marginLeft;
  // avatarPreview.style.objectFit = `cover`;
};

// Фотография жилья
const uploadImage = (fileName) => {
  const divContainer = document.createElement(`div`);
  divContainer.classList.add(`ad-form__photo`);
  photoContainer.appendChild(divContainer);
  const imageElement = document.createElement(`img`);
  // const editedStyle = stylesToPreview.images.edited;

  const onImageLoad = () => {
    URL.revokeObjectURL(imageElement.src);
    imageElement.removeEventListener(`load`, onImageLoad);
  };

  imageElement.addEventListener(`load`, onImageLoad);
  imageElement.src = URL.createObjectURL(fileName);

  xxx();
  // imageElement.setAttribute(`alt`, ALT_TEXT);
  // imageElement.setAttribute(`width`, editedStyle.width);
  // imageElement.setAttribute(`height`, editedStyle.height);

  // imageElement.style.width = editedStyle.width;
  // imageElement.style.height = editedStyle.height;
  // imageElement.style.borderRadius = editedStyle.borderRadius;
  // imageElement.style.objectFit = `cover`;
  imageElement.setAttribute(`alt`, ALT_TEXT);

  examplePhotoContainer.remove();
  divContainer.appendChild(imageElement);
};

const onAvatarFileNameChange = () => {
  fileChooser(avatarFileName.files[0], uploadAvatar);
};

const onHouseImagesInputChange = () => {
  fileChooser(houseImagesInput.files[0], uploadImage);
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
