export const convertBase64ToImage = (base64Origin) => {
    if(base64Origin){
        const base64Image = base64Origin;

        // Convert the binary data to a Base64 encoded string
        const base64String = base64Image.toString('base64');

        // Construct the URL with the base64 encoded string
        const imageUrl = `data:image/jpeg;base64,${base64String}`;

        return imageUrl;
    } else {
        return "https://picsum.photoAs/200/300"
    }
}