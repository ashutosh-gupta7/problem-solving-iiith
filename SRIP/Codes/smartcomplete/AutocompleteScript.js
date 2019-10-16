/*
NOTE: Arrow key navigation and enter to select not currently working

More info in LineAutocomplete.html
*/

//Array for C functions, to be populated with all functions when script complete
var c = [
"scanf", 
"printf"
]

//Function for autocompletion
//input: textarea to autocomplete in
//values: list of completed items
function complete(input, values) {
	var focus; //Arrow key navigation focus
	
	input.addEventListener("input", function(event) {
		var autocomplete; //Div for autocomplete
		var listItem; //DIV for autocomplete item
		var val = this.value; //text in input
		
		closeAutocomplete();
		if(!(val)) {
			return false;
			//Dont show anything if empty
		} else {
			focus = -1;
			//Create outside div for autocomplete elements
			autocomplete = document.createElement("DIV");
			autocomplete.setAttribute("id", this.id + "list");
			autocomplete.setAttribute("class", "items");
			this.parentNode.appendChild(autocomplete); //Make the list a child of textarea
			
			var i; //Loop Control
			for (i = 0; i < values.length; i++) {
				
				//If text matches with start of completed function, add to  list
				if (values[i].substr(0,val.length).toUpperCase() == val.toUpperCase()) {
					listItem = document.createElement("DIV");
					listItem.innerHTML = "<b>" + values[i].substr(0, val.length) + "</b>";
					listItem.innerHTML += values[i].substr(val.length);
					listItem.innerHTML += "<input type='hidden' value='" + values[i] + "'>";
					listItem.addEventListener("click", function(e) {
						input.value = this.getElementsByTagName("input")[0].value;
						closeAutocomplete();
					});
					autocomplete.appendChild(listItem);
				}
			}
		}
		
	});
	
	//Arrow key navigation
	input.addEventListener("keydown", function(e) {
		var list = document.getElementById(this.id + "list");
		if (list) {
			list = list.getElementsByTagName("div");
		}
		if (e.keyCode == 40) {
		
			//Down arrow
			focus++;
		
			highlightField(list);
		} else if (e.keyCode == 38) {
		
			//Up arrow
			focus--;
		
			highlightField(list);
		} else if (e.keyCode == 13) {
		
			//Enter (select)
			e.preventDefault();
			if (focus > -1) {
				if (list) {
					
					//Fire onClick() function
					list[focus].click();
				}
			}
		}
	});
  
  //Highlight the item
	function highlightField(item) {
	  
		if (!item) {
			return false;
		} else {
			//Remove previous highlight
			removeHighlight(item);
			if (focus >= item.length) {
				focus = 0;
			}
			
			if (focus < 0) {
				focus = (item.length - 1);
			}
	
			item[focus].classList.add("highlight");
		}
	}
	
	//Remove highlight
	function removeHighlight(item) {
	  
		for (var i = 0; i < item.length; i++) {
			item[i].classList.remove("highlight");
		}
	}
	
	//Close the autocomplete list
	function closeAutocomplete(item) {
	  
		var list = document.getElementsByClassName("items");
		var i;
		for (i = 0; i < list.length; i++) {
			if (item != list[i] && item != input) {
				list[i].parentNode.removeChild(list[i]);
			}
		}
	}
}


complete(document.getElementById("fillarea"), c);