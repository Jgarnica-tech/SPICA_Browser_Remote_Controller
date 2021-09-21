console.log("Ajax file connection success");

document.querySelector('#info_btn').addEventListener('click',get_data)

function get_data(){
	console.log("Starting 'get_data' function")

	let url = "system/station1/dhs1"
	let paramethers = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: "info", par: "" ,return:"json"}),         
    }

	fetch(url,paramethers)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log(error))

	//for(let i=0;i<data.length;i++){
	//	$("#info_tbody")
	//}
}


