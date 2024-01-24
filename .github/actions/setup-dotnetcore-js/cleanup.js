const fs = require('fs').promises;
const path = require('path');

async function deleteFolder(folderPath) {
  console.log(`Accessing directory: ${folderPath}`);
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      console.log(`Deleting subdirectory: ${fullPath}`);
      await deleteFolder(fullPath);
    } else {
      console.log(`Deleting file: ${fullPath}`);
      await fs.unlink(fullPath);
    }
  }
  console.log(`Removing directory: ${folderPath}`);
  await fs.rmdir(folderPath);
}

const dotnetPath = path.join(process.env['GITHUB_WORKSPACE'], 'dotnet');
console.log('Starting cleanup process...');

deleteFolder(dotnetPath).catch(err => {
  console.error(`Error during cleanup: ${err}`);
  process.exit(1);
});

console.log(`Successfully deleted: ${dotnetPath}`);

console.log('Finished Cleanup Process...');
