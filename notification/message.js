function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
    return hDisplay + mDisplay;
  }
function toLocalTime(start_time){
  var utcStartDate = start_time;
  let localStartDate = new Date(utcStartDate);
  return localStartDate.toLocaleString();
}
function htmlbody(data) {
     function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
    return hDisplay + mDisplay;
  }
  return `<!DOCTYPE html>
  <html>
  <style>

  </style>
  <body>
  <div style= "background-color: #033249" padding-top: 50px;>
  <center>
  <h1 style="color:white;"><a href="https://imgbb.com/"><img src="https://i.ibb.co/NFZrv7f/binary-code-1.png" alt="binary-code-1" width="30" height="30"></a>&ensp;Coder's Calendar</h1></center>
    <div style="color: white;margin-left: 5%;margin-right: 5%; padding-bottom: 30px">
        <table style="  font-family: arial, sans-serif;border-collapse: collapse;width: 100%;">
          <tr>
            <th style="border: 1px solid #dddddd;text-align: left;font-size: 12px;padding: 6px;">Start Time</th>
            <th style="border: 1px solid #dddddd;text-align: left;font-size: 12px;padding: 6px;">Duration</th>
            <th style="border: 1px solid #dddddd;text-align: left;font-size: 12px;padding: 6px;">Title</th>
            <th style="border: 1px solid #dddddd;text-align: left;font-size: 12px;padding: 6px;">Website</th>
          </tr>
    ` +
    data.map(function(item) {
        return `<tr>
        <td style="border: 1px solid #dddddd;text-align: left;font-size: 12px;padding: 6px;">${toLocalTime(item.start_time)}\</td>
        <td style="border: 1px solid #dddddd;text-align: left;font-size: 12px;padding: 6px;">${secondsToHms(item.duration)}</td>
        <td style="border: 1px solid #dddddd;text-align: left;font-size: 12px;padding: 6px;"><a href=${item.url}>${item.name}</a></td>
        <td style="border: 1px solid #dddddd;text-align: left;font-size: 12px;padding: 6px;">${item.site}</td>
    </tr>` 
    }).join('') + 
      `
        </table>
    </div>
  </div>
  </body>
  </html>
  
  `;
}

export default {htmlbody}
