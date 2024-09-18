document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("population-data");

  async function fetchData() {
    try {
      const url =
        "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";

      // Fetch population data
      const response = await fetch(url);

      // Log the response status
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Fetch error: ${response.statusText}`);
      }

      // Parse JSON response
      const data = await response.json();

      // Log the JSON data
      console.log("Fetched data:", data);

      // Extract data from response
      const municipalities = data.dataset.dimension.Alue.category.label;
      const populations = data.dataset.value;

      // Check if municipalities and populations are arrays
      console.log("Municipalities:", municipalities);
      console.log("Populations:", populations);

      // Clear existing rows
      tbody.innerHTML = "";

      municipalities.forEach((municipality, index) => {
        if (index >= populations.length) {
          console.warn(`Missing data for municipality: ${municipality}`);
          return;
        }

        const population = populations[index];

        // Create table row
        const row = document.createElement("tr");

        // Create and append cells
        const municipalityCell = document.createElement("td");
        municipalityCell.textContent = municipality;
        row.appendChild(municipalityCell);

        const populationCell = document.createElement("td");
        populationCell.textContent = population;
        row.appendChild(populationCell);

        tbody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData();
});
