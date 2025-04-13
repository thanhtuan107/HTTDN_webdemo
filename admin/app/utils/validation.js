const validateName = (name) => {
  if (!name || name.length > 100) {
    return "Tên rượu không hợp lệ! Tối đa 100 ký tự.";
  }
  return "";
};

const validatePrice = (price) => {
  if (!price || isNaN(price) || price <= 0) {
    return "Giá không hợp lệ! Phải là số và lớn hơn 0.";
  }
  return "";
};

const validateVolume = (volume) => {
  if (!volume || isNaN(volume) || volume <= 0) {
    return "Dung tích không hợp lệ! Phải là số và lớn hơn 0.";
  }
  return "";
};

const validateAlcoholContent = (alcoholContent) => {
  if (!alcoholContent || isNaN(alcoholContent) || alcoholContent <= 0 || alcoholContent > 100) {
    return "Độ cồn không hợp lệ! Phải là số từ 0 đến 100.";
  }
  return "";
};

const validateImage = (img) => {
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg))$/i;
  if (!img || !urlPattern.test(img)) {
    return "Hình ảnh không hợp lệ! Gán link ảnh định dạng hình ảnh (.png, .jpg, .jpeg).";
  }
  return "";
};

const validateDescription = (desc) => {
  if (desc.length > 500) {
    return "Mô tả không hợp lệ! Tối đa 500 ký tự.";
  }
  return "";
};

const validateType = (type, validTypes) => {
  if (!type || !validTypes.includes(type)) {
    return "Loại rượu không hợp lệ!";
  }
  return "";
};

const validateOrigin = (origin) => {
  if (!origin || origin.length > 100) {
    return "Xuất xứ không hợp lệ! Tối đa 100 ký tự.";
  }
  return "";
};

export {
  validateName,
  validatePrice,
  validateVolume,
  validateAlcoholContent,
  validateImage,
  validateDescription,
  validateType,
  validateOrigin
};
