// Let's code our chatbot's logic!
function IsEnter()
{
	var TextBox_val = document.getElementById("InputBox").value; // Get all the data from the input box.

	// If enter key is pressed then only respond.
	if (TextBox_val != "")
	{
		if (event.keyCode == 13)
			main();
	}
}

function main()
{
	// the main logic will be coded here.
	var TextBox_val = document.getElementById("InputBox").value; // Get all the data from the input box.
	var ResponseText_val = document.getElementById("ResponseText"); // Get all the data from the response text.

	var FormatInput = TextBox_val.toLowerCase().trim();
	if (FormatInput.includes("hi") || FormatInput.includes("hello"))
		ResponseText_val.innerHTML = "Hello!";

	else if (FormatInput.includes("how are you"))
		ResponseText_val.innerHTML = "I'm fine! Thanks for asking!";

	// Open websites!
	else if (FormatInput.includes("open google"))
	{
		// "https://" is important!
		ResponseText_val.innerHTML = "Opening Google";
		window.open("https://www.google.com", "_blank");
	}

	else if (FormatInput.includes("open youtube"))
	{
		// "https://" is important!
		ResponseText_val.innerHTML = "Opening YouTube";
		window.open("https://www.youtube.com", "_blank");
	}

	else if (FormatInput.includes("open github"))
	{
		// "https://" is important!
		ResponseText_val.innerHTML = "Opening Vivek Shah on Github";
		window.open("https://github.com/vivek-c-shah", "_blank");
	}

	else if (FormatInput.includes("open linkedin"))
	{
		// "https://" is important!
		ResponseText_val.innerHTML = "Opening Vivek Shah's page on LinkedIn";
		window.open("https://www.linkedin.com/in/the-cipher-vivek/", "_blank");
	}

	else
		ResponseText_val.innerHTML = "Sorry, I can't understand you 😔";
}