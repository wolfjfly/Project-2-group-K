$("#button").click(function(event){
    event.preventDefault()
    const email = $("#email").val();
    const password = $("#password").val();

    console.log(email, password)
  });
