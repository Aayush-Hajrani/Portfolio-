
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

function opentab(tabname, event) {
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");

    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");

}

document.getElementById("contactform").addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const submitmsg = document.getElementById("submit-message");

    const formdata = {
        name: name,
        email: email,
        message: message
    };

    fetch('https://formspree.io/f/mdknkkwa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
    })
        .then(response => {
            if (response.ok) {
                
                submitmsg.innerHTML = "Thank you! Your form has been submitted successfully."
                document.getElementById('contactform').reset();
            }
            else {
                return response.json().then(data => {
                    if (data.errors) {
                        submitmsg.innerHTML = 'Error:' + data.errors.map(error => error.message).join(',');
                    }
                })
            }
        })
        .catch(error => {
            console.log('error:', error);
           submitmsg.innerHTML = 'There was a problem submitting your form. Please try again.';
        });

});