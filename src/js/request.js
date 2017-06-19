
export default function getData(url) {
  // simple promise to get file content
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send(null);
  });
}

export function getJSON(url) {
  // get JSON file from url and convert to object
  return getData(url).then(JSON.parse).catch(function(err) {
    console.log("getJSON failed for", url, err);
    throw err;
  });
}

export function saveJSON(file, object) {
  // Send objecto to request.php as URL
  var str = JSON.stringify(object);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","request.php?q=" + str, true);
  xmlhttp.send();
}
