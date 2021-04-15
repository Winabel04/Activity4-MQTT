console.log("index.js");
// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or
// var client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
// var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

//this is function for the connection if it is connected or not
function connect(){
  document.getElementById('status').value = "Connecting...";
  client = mqtt.connect(document.getElementById('broker').value);
  client.on('connect', function () {
      document.getElementById('status').value = "Connected!";
  })
  
  //incoming message
  client.on('message', function (pub_topic, message) {
      let date = new Date();
      if(pub_topic == document.getElementById('sub-input-topic').value){
        document.getElementById('incoming-table').innerHTML += `<tr><td>${pub_topic}</td><td>${message}</td><td>${date.toDateString()+" "+ date.toLocaleTimeString()}</td></tr>`;  
      }
  })
}

//function for the publish button
function publish(){
  
  let pub_input = document.getElementById('pub-input-topic');
  let pub_payload = document.getElementById('pub-input-payload');
  let date = new Date();

    if(pub_input.value != "" && pub_payload != ""){
      client.publish(pub_input.value,pub_payload.value);
      document.getElementById('pub-table').innerHTML += `<tr><td>${pub_input.value}</td><td>${pub_payload.value}</td><td>${date.toDateString()+" "+ date.toLocaleTimeString()}</td></tr>`;  
    }else{
      alert("Input the topic and payload!");
    }
}


//function for the subcribe button
function subscribe(){

  let sub_input = document.getElementById('sub-input-topic');
  let date = new Date();
  
  if(sub_input.value != ""){
    client.subscribe(sub_input.value, (error) => {
      if(error){
        console.log("Error in subscribing topic!");
      }
    });
    document.getElementById('sub-table').innerHTML += `<tr><td>${sub_input.value}</td><td>${date.toDateString()+" "+ date.toLocaleTimeString()}</td></tr>`;  
  }else{
    alert("Input the topic!");
  }
}
