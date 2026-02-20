let dir = document.getElementById("dirname");
let declutter_btn = document.getElementById("declutter");

declutter_btn.addEventListener("click", async () => {
  let directory = dir.value;
  if (!directory) {
    alert("No directory path");
  } else {
    // console.log(directory);
    try {
      const response = await fetch("/organize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: directory }), // Change `input` to `directory`
      });
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      // const data = await response.json(); // Parse the JSON response
      // console.log(data.message); // Log the server's response
    } catch (error) {
      console.log(error.message);
      alert("Error: " + error.message); // Show the error in an alert
    }
  }
});
