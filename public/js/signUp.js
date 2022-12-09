$("#button").click(async function(event){
    event.preventDefault()
    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();

    if (name && email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/signup endpoint', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/reqList page endpont');
      } else {
        alert(response.statusText);
      }
      }
  });

