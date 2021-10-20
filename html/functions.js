
console.log("functions file connection success"); // show via console that the file connection was successfull

function select_station(){
    console.log("Starting 'select_station' function");   // show via console that the function started
    var select = document.getElementById("select_station")
    var sel = select.options[select.selectedIndex].value
    return sel
}

// function that works when buttons with "pcmd" class were clicked, it allows to indicate actions to the emulator
$('.pcmd').on('click',function(e){

    console.log("Starting 'server control' function");   // show via console that the function started

    //Console logs about the button clicked and the action that was iniciated
    if(e.target.dataset.cmd=="testcmd1"){
        console.log("Starting '1st test' function")
    }
    if(e.target.dataset.cmd=="testcmd2"){
        console.log("Starting '2nd test' function")
    }
    if(e.target.dataset.cmd=="testcmd3"){
        console.log("Starting '3rd test' function")
    }

    if(e.target.dataset.cmd=="mode"){
        if(e.target.dataset.par=="setup"){
            console.log("Starting 'setup' mode")
        }
        if(e.target.dataset.par=="record"){
            console.log("Starting 'record' mode")
        }
        if(e.target.dataset.par=="playback"){
            console.log("Starting 'playback' mode")
        }  
    }

    if(e.target.dataset.cmd=="play"){
        console.log("Starting 'play' button function")
    }
    if(e.target.dataset.cmd=="stop"){
        console.log("Starting 'stop' button function")
    }

    if(e.target.dataset.cmd=="first"){
        console.log("Starting 'first' button function")
    }
    if(e.target.dataset.cmd=="prev"){
        console.log("Starting 'prev' button function")
    }
    if(e.target.dataset.cmd=="next"){
        console.log("Starting 'next' button function")
    }
    if(e.target.dataset.cmd=="last"){
        console.log("Starting 'last' button function")
    }

    let station = select_station()                                  // variable that saves the actual station
    let url = 'system/'+station+'/dhs1'+e.target.dataset.target    // variable that saves the "url" that will be used in "fetch method" 
    let paramethers = {                                             // variable that saves the "paramethers" that will be used in "fetch method"

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

    get_data()                                          // starts get_data function to test the progress bar change
                                       
    

});

// function that works when the range input with "seek_norm" id changes his value, it allows to indicate the frame that will be positioned in the emulator via a range input

$('#seek_norm').on('change',function(e){
    console.log("Starting 'onchange_progress_bar' function"); // show via console that the function started

    let station = select_station()                      // variable that saves the actual station
    let url = 'system/'+station+'/dhs1/playback'                                // variable that saves the "url" that will be used in "fetch method"         
    let paramethers = {                                 // variable that saves the "paramethers" that will be used in "fetch method"
                    
        method: 'POST',                                 // indicates the method will be via "POST"
        headers: {
            'Content-Type': 'application/json',         // indicates the type of content as JSON
        },
        body: JSON.stringify({ cmd: "seek_norm", par: e.target.value/7501.0 }),         //convert to string the data and normalize the value to show it in a "range input"           
    }

    fetch(url,paramethers )                                 // the "fetch method" begins to work
    .then(response => response.json())
    .then(data => {console.log('Success:', data);})         // show via console the data that received
    .catch((error) => {console.error('Error:', error);});   // in case of an error 

    get_data()                                              // starts get_data function to test the progress bar change

})

// function that changes the value of the progress bar via 
function change_progress_bar(data_frame){
    console.log("Starting 'change_progress_bar' function")  // show via console that the function started 
    var input = document.getElementById('seek_norm')        // get the input with "seek_norm" id
    var data_value = parseFloat(data_frame.fri)             // convert value to float to avoid concatenating numbers
    input.value = data_value                                // change the value of the progress bar 
}

function print_data(data){
    console.log("Starting 'print_data' function")            // show via console that the function started 
    var table = document.getElementById('info_tbody')
    var input = document.getElementById('info_tbody')        // get the input with "seek_norm" id    

}

document.querySelector('#info_btn').addEventListener('click',get_data)      // In case that the button with "info_btn" id is clicked, the fuction "get_data()" begins to work

// function that get data from server and show it via console
function get_data(){                                    
    console.log("Starting 'get_data' function")         // show via console that the function started 

    let station = select_station()
    let url = "system/"+station+"/dhs1"                    // variable that saves the "url" that will be used in "fetch method"
    let paramethers = {                                 // variable that saves the "paramethers" that will be used in "fetch method"

        method: 'POST',                                 // indicates the metod will be via "POST"
        headers: {
            'Content-Type': 'application/json',         // indicates the type of content as JSON
        },
        body: JSON.stringify({ cmd: "info", par: "" }),       //convert the data to "string" and use the commands to get information
    }

    fetch(url,paramethers)             // the "fetch method" begins to work                     
        .then(response => response.json())              
        .then(data => {
            console.log(data)                           // show via console the data that received
            change_progress_bar(data)                   //starts the function that changes the progress bar value
            print_data(data)                            // starts print_data function to test the progress bar change
            get_image()                                 // starts get_image function to test the progress bar change
        })
        .catch(error => console.log(error))             // prepare in case of an error

}

function show_image(blob){
    console.log("Starting 'show_image' function")         // show via console that the function started 
    img = document.getElementById("actual_frame")

    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
    var base64data = reader.result;                
    console.log("image base64data : success ")

    img.src = base64data
}

   
}

function get_image(){                                    
    console.log("Starting 'get_image' function")         // show via console that the function started 

    let station = select_station()
    let url = "system/"+station+"/dhs1/image"                    // variable that saves the "url" that will be used in "fetch method"
    let paramethers = {                                 // variable that saves the "paramethers" that will be used in "fetch method"

        method: 'GET',                                 // indicates the metod will be via "GET"
        headers: {
            'Content-Type': 'application/json',         // indicates the type of content as JSON
        },
    
    }

    fetch(url,paramethers)                              // the "fetch method" begins to work                     
        .then(response => response.blob())
        .then(imageBlob => {
            show_image(imageBlob)
        })
    .catch(error => console.log(error))             // prepare in case of an error

}





