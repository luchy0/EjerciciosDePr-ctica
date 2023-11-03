// Función para cargar datos de la API
async function fetchData() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/independent?status=true");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar datos de la API:", error);
        return [];
    }
}

// Función para llenar la tabla con datos filtrados
async function fillTable() {
    const data = await fetchData();
    const tableBody = document.querySelector("#countryTable tbody");
    
    data.forEach(country => {
        if (country.region ==  "Americas" && country.population > 100000) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${country.name.common}</td>
                <td>
                    <ul>
                        ${country.currencies ? Object.values(country.currencies).map(currency => `<li>${currency.name}</li>`).join("") : "N/A"}
                    </ul>
                </td>
                <td>
                    ${country.region}
                </td>
                <td>${country.population}</td>
                <td>
                    <ul>
                        ${country.capital.map(capital => `<li>${capital}</li>`).join("")}
                    </ul>
                </td>
            `;
            
            tableBody.appendChild(row);
            console.log(country.name.common);
        }
        
    });

}