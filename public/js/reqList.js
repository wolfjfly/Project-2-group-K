

$("#claim-request").click(async function(event){
   event.preventDefault()

   const reqId= $(this).attr("data-fulfillId");
   // const fulfilled= true 
   // post 1 request endpoint needed here
   const response = await fetch(`/api/requests/${reqId}`, {
      method: "PUT",
      
      headers: {
         "Content-Type": "application/json",
      },
   });
   
   if (response.ok) {
      document.location.replace("/thanks");
   } else {
      alert("Failed to claim Request");
   }
})
