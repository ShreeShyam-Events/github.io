const scriptURL = 'https://script.google.com/macros/s/AKfycbxaZXIToYWO2tIwnkOrQU1YmYXR-evyb_jU9HtY4C91JRxtkgxKx-jJOOYBkdg2FTKm/exec'

const form = document.getElementById('contact-form') // Changed to use getElementById for more specific selection

form.addEventListener('submit', e => {
  e.preventDefault()
  
  fetch(scriptURL, { 
    method: 'POST', 
    body: new FormData(form)
  })
  .then(response => {
    // Show a custom alert
    Swal.fire({
      title: 'Thank You!',
      text: 'Your message has been sent successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      // Reload the page and scroll to top
      if (result.isConfirmed) {
        window.location.href = 'index.html#home'
      }
    })
  })
  .catch(error => {
    // Show an error alert if submission fails
    Swal.fire({
      title: 'Oops...',
      text: 'Something went wrong. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
    console.error('Error!', error.message)
  })
})