
console.log("functions file connection success"); // show via console that the file connection was successfull

// function that works when buttons with "pcmd" class were clicked, it allows to indicate actions to the emulator
$('.pcmd').on('click',function(e){

    console.log("Starting 'Playback mode' function");   // show via console that the function started

    let url = e.target.dataset.target                   // variable that saves the "url" that will be used in "fetch method"
    let paramethers = {                                 // variable that saves the "paramethers" that will be used in "fetch method"

        method: 'POST',                                 // indicates the metod will be via "POST"
        headers: {
            'Content-Type': 'application/json',         // indicates the type of content as JSON
        },
        body: JSON.stringify({ cmd: e.target.dataset.cmd, par: e.target.dataset.par }),         //convert to string the data and use the commands to indicate actions to the emulator
    }

    fetch(url,paramethers)                              // the "fetch method" begins to work
    .then(response => response.json())                  
    .then(data => {console.log('Success:', data);})     // show via console the data that received
    .catch((error) => {console.error('Error:', error);});   // in case of an error 

});

// function that works when the range input with "seek_norm" id changes his value, it allows to indicate the frame that will be positioned in the emulator via a range input
$('#seek_norm').on('change',function(e){

    console.log("Starting 'Seek normalized' function"); // show via console that the function started

    let url = 'system/station1/dhs1/playback'           // variable that saves the "url" that will be used in "fetch method"
    let paramethers = {                                 // variable that saves the "paramethers" that will be used in "fetch method"
                    
        method: 'POST',                                 // indicates the method will be via "POST"
        headers: {
            'Content-Type': 'application/json',         // indicates the type of content as JSON
        },
        body: JSON.stringify({ cmd: "seek_norm", par: e.target.value/1000.0 }),         //convert to string the data and normalize the value to show it in a "range input"           
    }

    fetch(url,paramethers )                                 // the "fetch method" begins to work
    .then(response => response.json())
    .then(data => {console.log('Success:', data);})         // show via console the data that received
    .catch((error) => {console.error('Error:', error);});   // in case of an error 

});

document.querySelector('#info_btn').addEventListener('click',get_data)      // In case that the button with "info_btn" id is clicked, the fuction "get_data()" begins to work

// function that get data from server and show it via console
function get_data(){                                    
    console.log("Starting 'get_data' function")         // show via console that the function started 

    let url = "system/station1/dhs1"                    // variable that saves the "url" that will be used in "fetch method"
    let paramethers = {                                 // variable that saves the "paramethers" that will be used in "fetch method"

        method: 'POST',                                 // indicates the metod will be via "POST"
        headers: {
            'Content-Type': 'application/json',         // indicates the type of content as JSON
        },
        body: JSON.stringify({ cmd: "info", par: "" ,return:"json"}),       //convert the data to "string" and use the commands to get information
    }

    fetch(url,paramethers)                              // the "fetch method" begins to work
        .then(response => response.json())              
        .then(data => console.log(data))                // show via console the data that received
        .catch(error => console.log(error))             // prepare in case of an error

}




