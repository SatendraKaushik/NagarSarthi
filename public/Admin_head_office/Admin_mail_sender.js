
    document.getElementById('sendEmailBtn').addEventListener('click', function() {
                    fetch('/sendemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    message: `${message}`
                })
            })
            .then(response => {
                if (response.ok) {
                    console.log('Email sent successfully');
                } else {
                    console.error('Error sending email');
                }
            })
            .catch(error => {
                console.error('Error sending email:', error);
           });
        });
    
