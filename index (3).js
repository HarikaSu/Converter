document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const fromUnit = urlParams.get('fromUnit');
  const toUnit = urlParams.get('toUnit');
  const value = parseFloat(urlParams.get('value'));

  convert(category, fromUnit, toUnit, value);
});

function convert(category, fromUnit, toUnit, value) {
  let result, calculationInfo, definition;

  switch (category) {
      case "length":
          if (fromUnit === "meters" && toUnit === "kilometers") {
              result = value / 1000;
              calculationInfo = `${value} meters = ${result} kilometers`;
              definition = "A meter is the base unit of length in the International System of Units (SI). A kilometer is equal to 1000 meters.";
          } else if (fromUnit === "meters" && toUnit === "centimeters") {
              result = value * 100;
              calculationInfo = `${value} meters = ${result} centimeters`;
              definition = "A centimeter is 1/100th of a meter.";
          } else if (fromUnit === "meters" && toUnit === "millimeters") {
              result = value * 1000;
              calculationInfo = `${value} meters = ${result} millimeters`;
              definition = "A millimeter is 1/1000th of a meter.";
          } else if (fromUnit === "meters" && toUnit === "inches") {
              result = value * 39.3701;
              calculationInfo = `${value} meters = ${result} inches`;
              definition = "An inch is equal to 0.0254 meters.";
          } else if (fromUnit === "meters" && toUnit === "feet") {
              result = value * 3.28084;
              calculationInfo = `${value} meters = ${result} feet`;
              definition = "A foot is equal to 0.3048 meters.";
          }
          break;

      case "temperature":
          if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
              result = (value * 9/5) + 32;
              calculationInfo = `${value}°C = ${result}°F`;
              definition = "Celsius and Fahrenheit are two scales for measuring temperature.";
          }
          break;

      // Add more cases for other conversions...
  }

  const conversionDetails = document.getElementById("conversionDetails");
  conversionDetails.innerHTML = `
      <p><strong>Conversion:</strong> ${calculationInfo}</p>
      <p><strong>Definition:</strong> ${definition}</p>
      <p><strong>Result Value:</strong> ${result}</p>
  `;
}
