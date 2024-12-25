function updateUnits() {
  const category = document.getElementById("category").value;
  const fromUnitSelect = document.getElementById("fromUnit");
  const toUnitSelect = document.getElementById("toUnit");

  let units = [];

  switch (category) {
      case "length":
          units = ["meters", "kilometers", "centimeters", "millimeters", "inches", "feet"];
          break;
      case "temperature":
          units = ["Celsius", "Fahrenheit", "Kelvin"];
          break;
      // Other cases
  }

  fromUnitSelect.innerHTML = `<option value="">Select From Unit</option>` + units.map(unit => `<option value="${unit}">${unit}</option>`).join('');
  toUnitSelect.innerHTML = `<option value="">Select To Unit</option>` + units.map(unit => `<option value="${unit}">${unit}</option>`).join('');
}

document.getElementById("converterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const category = document.getElementById("category").value;
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  const value = parseFloat(document.getElementById("value").value);

  if (!fromUnit || !toUnit) {
      alert("Please select both units for conversion.");
      return;
  }

  const result = performConversion(category, fromUnit, toUnit, value);
  const url = `result.html?category=${category}&fromUnit=${fromUnit}&toUnit=${toUnit}&value=${value}&result=${result.result}&calculationInfo=${result.calculationInfo}&definition=${result.definition}`;
  window.location.href = url;
});

document.getElementById("saveConversionBtn").addEventListener("click", function () {
  const category = document.getElementById("category").value;
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  const value = document.getElementById("value").value;

  if (value && fromUnit && toUnit) {
      const result = performConversion(category, fromUnit, toUnit, parseFloat(value));
      const conversion = {
          category,
          fromUnit,
          toUnit,
          value,
          result: result.result,
          calculationInfo: result.calculationInfo,
          definition: result.definition
      };

      let savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];
      savedConversions.push(conversion);
      localStorage.setItem("savedConversions", JSON.stringify(savedConversions));

      alert("Conversion saved successfully!");
  } else {
      alert("Please fill in all fields before saving.");
  }
});

document.addEventListener('DOMContentLoaded', () => {
  updateUnits();
});

function performConversion(category, fromUnit, toUnit, value) {
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
          } else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") {
              result = (value - 32) * 5/9;
              calculationInfo = `${value}°F = ${result}°C`;
              definition = "Fahrenheit and Celsius are two scales for measuring temperature.";
          } else if (fromUnit === "Celsius" && toUnit === "Kelvin") {
              result = value + 273.15;
              calculationInfo = `${value}°C = ${result} K`;
              definition = "Kelvin is the base unit of temperature in the International System of Units (SI).";
          } else if (fromUnit === "Kelvin" && toUnit === "Celsius") {
              result = value - 273.15;
              calculationInfo = `${value} K = ${result}°C`;
              definition = "Kelvin is the base unit of temperature in the International System of Units (SI).";
          }
          break;

      // Add more cases for other conversions...
  }

  return { result, calculationInfo, definition };
}
