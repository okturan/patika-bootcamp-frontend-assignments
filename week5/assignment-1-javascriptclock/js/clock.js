// Prompt the user for their name
var userName = prompt("Please enter your Name:");

// Check if a name was entered
if (userName !== null && userName.trim() !== "") {
  // Display the user's name in the HTML
  document.getElementById("myName").innerText = userName;
} else {
  // If no name was entered, set a default or prompt again
  alert("Please enter a name.");
  location.reload(); // Reload the page to prompt again
}

// Display the user's name
document.getElementById("myName").innerText = userName;

 // Function to get the ordinal suffix for a given day
 function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // Covers 4th to 20th
    switch (day % 10) {
        case 1:  return 'st';
        case 2:  return 'nd';
        case 3:  return 'rd';
        default: return 'th';
    }
}

// Function to format and display the date and time
function showFormattedDateTime() {
    const now = new Date();
    
    // Get full month name
    const monthOptions = { month: 'long' };
    const monthName = now.toLocaleDateString('en-US', monthOptions);
    
    // Get day with ordinal suffix
    const day = now.getDate();
    const dayWithSuffix = day + getOrdinalSuffix(day);
    
    // Get full year
    const year = now.getFullYear();
    
    // Get weekday name
    const weekdayOptions = { weekday: 'long' };
    const weekdayName = now.toLocaleDateString('en-US', weekdayOptions);
    
    // Get time in 24-hour format
    const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeString = now.toLocaleTimeString('en-GB', timeOptions);
    
    // Combine into the desired sentence
    const formattedDateTime = `${weekdayName}, the ${dayWithSuffix} of ${monthName}, ${year}, at exactly ${timeString}`;
    
    // Update the HTML content
    document.getElementById("formattedDateTime").innerText = formattedDateTime;
    
    // Update every second
    setTimeout(showFormattedDateTime, 1000);
}

// Initialize the function when the DOM is fully loaded
showFormattedDateTime();
    