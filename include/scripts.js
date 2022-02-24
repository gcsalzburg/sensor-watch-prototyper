'use strict';

// When page loads
document.addEventListener("DOMContentLoaded", () => {

	// Copy over the segments array to a couple of places (to avoid having too heavy an HTML on load)
	const segments_source = document.querySelector(".segment_components").innerHTML;
	const copy_watch_display = (destination) => {
		destination.innerHTML = destination.innerHTML + segments_source;
	};
	copy_watch_display(document.querySelector(".live_watch"));
	copy_watch_display(document.querySelector(".segments"));
	
	// Create a new instance of the Designer 
	const designer = new Designer({
		sequences_container: document.querySelector(".sequences"), 
		live_watch : document.querySelector(".live_watch"),
		data: sample_sequence
	});

	// Add click handlers to menu buttons
	document.querySelectorAll("nav a").forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();

			// Get the hash, to work out what sort of switch it is
			const url_target = link.href;
			if(!url_target){
				return;
			}
			const hash = url_target.substring(url_target.indexOf('#') + 1);

			switch(hash){

				case "play":
					designer.play_pause();
					e.target.classList.toggle("is_playing");
					break;
				
				case "undo":
					designer.history_undo();
					break;
				
				case "undoundo":
					designer.history_undoundo();
					break;

				case "add_sequence":
					designer.add_sequence();
					designer.history_save();
					break;

				case "import":
					upload_file();
					break;

				case "export":
					download_file();
					break;

				case "settings":
					localStorage.removeItem('undo_stack');
					localStorage.removeItem('undo_stack_position');
					break;
					
			}
			
			link.blur();
		});
	});

	// Receive input file from upload
	let upload_file = () => {
		const helper_link = document.createElement('input');
		helper_link.type = "file";
		helper_link.accept = "text/plain";
		helper_link.addEventListener("change", (e) => {

			if(e.target.files[0]){
				console.log(e.target.files[0]);
				let reader = new FileReader();
				reader.readAsText(e.target.files[0]);

				reader.onload = function() {
					designer.put_state(JSON.parse(reader.result));
					alert(`Imported: ${e.target.files[0].name}`);
					designer.history_save();
				};
				
				reader.onerror = function() {
					alert("Error importing file");
				};
			}


		});
		helper_link.click();
	}
	
	// Generate downloadable text file of data
	let download_file = () => {

		let data = JSON.stringify(designer.get_state());
	
		// Trigger download
		const helper_link = document.createElement('a');
		helper_link.href = `data:text/plain;charset=utf-8,${encodeURI(data)}`;
		helper_link.target = '_blank';
		helper_link.download = `sensor_watch_ui_${Math.round(Date.now()/1000)}.txt`;
		helper_link.click();
	}
	
});


const sample_sequence = {"start_time":1645723263039,"current_sequence_index":0,"sequences":[{"name":"Example countdown sequence","steps":[{"segments":[{"type":"digit","digit":"digit_0","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false,"segment_H":false,"segment_I":false}},{"type":"digit","digit":"digit_1","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false,"segment_dot":false}},{"type":"digit","digit":"digit_2","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_3","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_4","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_5","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_6","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_7","data":{"segment_A":true,"segment_B":true,"segment_C":true,"segment_D":true,"segment_E":false,"segment_F":false,"segment_G":true}},{"type":"digit","digit":"digit_8","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_9","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"special","data":{"colon":false,"signal":false,"bell":false,"pm":false,"hr":false,"lap":false}}],"hardware":{"led_0":false,"led_1":false,"buzzer":0},"duration":500},{"segments":[{"type":"digit","digit":"digit_0","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false,"segment_H":false,"segment_I":false}},{"type":"digit","digit":"digit_1","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false,"segment_dot":false}},{"type":"digit","digit":"digit_2","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_3","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_4","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_5","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_6","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_7","data":{"segment_A":true,"segment_B":true,"segment_C":false,"segment_D":true,"segment_E":true,"segment_F":false,"segment_G":true}},{"type":"digit","digit":"digit_8","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_9","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"special","data":{"colon":false,"signal":false,"bell":false,"pm":false,"hr":false,"lap":false}}],"hardware":{"led_0":false,"led_1":false,"buzzer":0},"duration":500},{"segments":[{"type":"digit","digit":"digit_0","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false,"segment_H":false,"segment_I":false}},{"type":"digit","digit":"digit_1","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false,"segment_dot":false}},{"type":"digit","digit":"digit_2","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_3","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_4","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_5","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_6","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_7","data":{"segment_A":false,"segment_B":true,"segment_C":true,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_8","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"digit","digit":"digit_9","data":{"segment_A":false,"segment_B":false,"segment_C":false,"segment_D":false,"segment_E":false,"segment_F":false,"segment_G":false}},{"type":"special","data":{"colon":false,"signal":false,"bell":false,"pm":false,"hr":false,"lap":false}}],"hardware":{"led_0":false,"led_1":false,"buzzer":0},"duration":500}]}]};