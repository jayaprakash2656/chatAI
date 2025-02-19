import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Recursively flattens a nested object or array.
 * @param obj - The object to flatten
 * @param prefix - Prefix for keys (used for nested arrays/objects)
 * @returns A flat object with keys as dot-separated paths
 */
const flattenObject = (obj: any, prefix = ""): any => {
  let flattened: any = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}_${key}` : key; // Create unique keys

    if (Array.isArray(value)) {
      // If the value is an array, flatten each item with index
      value.forEach((item, index) => {
        Object.assign(flattened, flattenObject(item, `${newKey}_${index}`));
      });
    } else if (typeof value === "object" && value !== null) {
      // If the value is an object, recurse into it
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      // Otherwise, directly assign the value
      flattened[newKey] = value;
    }
  });

  return flattened;
};

/**
 * Converts JSON data to Excel and downloads it.
 * @param jsonData - The nested JSON object
 * @param fileName - Name of the generated Excel file
 */
export const exportToExcel = (jsonData: any, fileName: string) => {
  if (!jsonData || typeof jsonData !== "object") {
    console.error("Invalid JSON data.");
    alert("Invalid JSON format.");
    return;
  }

  let flatArray: any[] = [];

  if (Array.isArray(jsonData)) {
    // If the root JSON is an array, flatten each object
    flatArray = jsonData.map((item) => flattenObject(item));
  } else if (jsonData.methods && Array.isArray(jsonData.methods)) {
    // If there's a 'methods' array inside the object, flatten each method with top-level data
    flatArray = jsonData.methods.map((method: any) => ({
      ...flattenObject(jsonData, "root"), // Flatten top-level properties
      ...flattenObject(method, "method"), // Flatten method-specific properties
    }));
  } else {
    // Otherwise, just flatten the entire object
    flatArray = [flattenObject(jsonData)];
  }

  // Convert to worksheet
  const worksheet = XLSX.utils.json_to_sheet(flatArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // Generate Blob and Save
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
};
