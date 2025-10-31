// src/utils/filehelpers.js

// ✅ CSV export utility
export const downloadCSV = (filename, data) => {
  if (!data || data.length === 0) return alert("No data to export!");

  const headers = Object.keys(data[0]);
  const rows = data.map(obj =>
    headers.map(h => `"${(obj[h] ?? "").toString().replace(/"/g, '""')}"`).join(",")
  );
  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ✅ PDF export utility
export const downloadTextAsPdf = (filename, title, lines) => {
  const blob = new Blob(
    [`${title}\n\n${lines.join("\n")}`],
    { type: "application/pdf" }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ✅ Optional: Web Share fallback
export const tryWebShare = async (data) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (err) {
      console.warn("Share cancelled or failed", err);
    }
  } else {
    navigator.clipboard.writeText(`${data.title}\n${data.text}`);
    alert("Copied to clipboard!");
  }
};
