const session = require("express-session");

$(".claim-request").click(async function(event){
   event.preventDefault()

   const reqId= $("#claim-request").val();
   const giver_id= session.user_id
   // const full_filled= true 
   // post 1 request endpoint needed here
   const response = await fetch(`/api/requests/${reqId}`, {
      method: "PUT",
      
      headers: {
         "Content-Type": "application/json",
      },
   });
   
   if (response.ok) {
      document.location.replace("/back to an empty request form");
   } else {
      alert("Failed to claim Request");
   }
})