document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("population-table");
  const tbody = table.querySelector("tbody");

  async function fetchData() {
    try {
      const populationUrl =
        "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
      const employmentUrl =
        "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";

      // Fetch population data
      const populationResponse = await fetch(populationUrl);
      if (!populationResponse.ok)
        throw new Error(
          `Network response was not ok: ${populationResponse.statusText}`
        );
      const populationData = await populationResponse.json();

      // Fetch employment data
      const employmentResponse = await fetch(employmentUrl);
      if (!employmentResponse.ok)
        throw new Error(
          `Network response was not ok: ${employmentResponse.statusText}`
        );
      const employmentData = await employmentResponse.json();

      // Extract and prepare the data
      const municipalities =
        populationData.dataset.dimension.Alue.category.label;
      const populations = populationData.dataset.value;
      const employmentAmounts = employmentData.dataset.value;

      // Clear existing rows
      tbody.innerHTML = "";

      municipalities.forEach((municipality, index) => {
        if (index >= populations.length || index >= employmentAmounts.length) {
          console.warn(`Missing data for municipality: ${municipality}`);
          return;
        }

        const population = populations[index];
        const employment = employmentAmounts[index];
        const employmentPercentage = ((employment / population) * 100).toFixed(
          2
        );

        const row = document.createElement("tr");

        const municipalityCell = document.createElement("td");
        municipalityCell.textContent = municipality;
        row.appendChild(municipalityCell);

        const populationCell = document.createElement("td");
        populationCell.textContent = population;
        row.appendChild(populationCell);

        const employmentCell = document.createElement("td");
        employmentCell.textContent = employment;
        row.appendChild(employmentCell);

        const percentageCell = document.createElement("td");
        percentageCell.textContent = `${employmentPercentage}%`;
        row.appendChild(percentageCell);

        // Conditional styling
        if (employmentPercentage > 45) {
          row.style.backgroundColor = "#abffbd";
        } else if (employmentPercentage < 25) {
          row.style.backgroundColor = "#ff9e9e";
        } else {
          row.style.backgroundColor = "#ffffff"; // Default row color
        }

        tbody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData();
});
