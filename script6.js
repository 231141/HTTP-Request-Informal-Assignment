const fileName = document.getElementById('fileName');

fileName.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const formdata = new FormData();
        formdata.append("image", file, file.name);

        const myHeaders = new Headers();
        myHeaders.append("x-apihub-key", "y4LJ3aK6dZDZq4KDRGwnHJKZoon7XP313Rx2HKD9u8JtNXkSKh");
        myHeaders.append("x-apihub-host", "Detect-Skin-Disease.allthingsdev.co");
        myHeaders.append("x-apihub-endpoint", "6578fc45-b948-4270-8718-bdc7941582b7");

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://Detect-Skin-Disease.proxy-production.allthingsdev.co/facebody/analysis/detect-skin-disease", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                DisplaySkin(result);
            })
            .catch(error => console.error('Error:', error));
    }
});

function DisplaySkin(_data) {
    // Your existing function logic
    let myData = JSON.parse(_data);
    console.log(myData.anime[0]);
}
