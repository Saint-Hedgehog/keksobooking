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

const setSomeStyles = (element, styles) => {
  element.setAttribute(`width`, styles.width);
  element.setAttribute(`height`, styles.height);

  element.style.width = styles.width;
  element.style.height = styles.height;
  element.style.borderRadius = styles.borderRadius;
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

  setSomeStyles(avatarPreview, editedStyle);
  avatarPreview.style.marginLeft = editedStyle.marginLeft;
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

  setSomeStyles(imageElement, editedStyle);
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
