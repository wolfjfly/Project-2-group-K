

//Date picker function
$(function() {
    $("#datepicker").datepicker();
});


  $("#button").click(async function(event){
    event.preventDefault()
    const title = $("#title").val();
    const description = $("#description").val();
    const date_needed = $("#datepicker").val();


    //post 1 request endpoint needed here
    const response = await fetch(`/api/requests/makeReq`, {
        method: "POST",
        body: JSON.stringify({
        title,
        description,
        date_needed,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to add Request");
      }
    });

