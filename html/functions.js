
console.log("functions file connection success");

$('.pcmd').on('click',function(e){

    console.log("Starting 'Playback mode' function");

    let url = e.target.dataset.target
    let paramethers = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: e.target.dataset.cmd, par: e.target.dataset.par }),         
    }

    fetch(url,paramethers)
    .then(response => response.json())
    .then(data => {console.log('Success:', data);})
    .catch((error) => {console.error('Error:', error);});

});

$('#seek_norm').on('change',function(e){

    console.log("Starting 'Seek normalized' function");

    let url = 'system/station1/dhs1/playback'
    let paramethers = {
                    
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: "seek_norm", par: e.target.value/1000.0 }),           
    }

    fetch(url,paramethers )
    .then(response => response.json())
    .then(data => {console.log('Success:', data);})
    .catch((error) => {console.error('Error:', error);});

});




