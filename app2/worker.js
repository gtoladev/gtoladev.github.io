
 

onmessage = function(e) {
  console.log('Worker: Message received from main script');
  var AP = e.data[0];

  AP.request({
      url: '/rest/api/3/search?fields=key,project,status&expand=transitions,changelog&startAt=0&maxResults=100000',
      type: 'GET',
      contentType: 'application/json',
      headers: { Accept: 'application/json' },
      success: function(responseText){
        console.log("success from worker:"+responseText);
      },
      error: function(xhr, statusText, errorThrown){
        console.log("err from worker: "+errorThrown);
      }
    });
}
  
