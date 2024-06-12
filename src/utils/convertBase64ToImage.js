export const convertBase64ToImage = (base64Origin) => {
  if (base64Origin) {
    const base64Image = base64Origin;

    // Convert the binary data to a Base64 encoded string
    const base64String = base64Image.toString("base64");

    // Construct the URL with the base64 encoded string
    const imageUrl = `data:image/jpeg;base64,${base64String}`;

    return imageUrl;
  } else {
    // Reference the default image correctly
    const defaultImageUrl = "/assets/images/default/diamond.jpg";
    return defaultImageUrl;
  }
  // D:\FPTUniversity\Semester5\SWP391_MinhTTH\FrontEnd_Template\merge\Bazaar\public\assets\images\default
};
