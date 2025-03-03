import fs from "fs";
import path from "path";

export default function CssFileList() {
  const dirPath = path.join(process.cwd(), "node_modules/highlight.js", "styles"); // Change as per your directory
  let files: string[] = [];

  try {
    files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".css"));
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">CSS Files in Directory</h2>
        {files.map((file, index) => (
          <p key={index} className="mb-1">
          {file}
          </p>
        ))}
    </div>
  );
}
