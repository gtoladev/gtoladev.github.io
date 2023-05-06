(function () {
  console.log("workder started");
  self.importScripts("https://connect-cdn.atl-paas.net/all.js");
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
})();