const fs = require('fs').promises;
const path = require('path');

async function deleteFolder(folderPath) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      await deleteFolder(fullPath);
    } else {
      await fs.unlink(fullPath);
    }
  }
  await fs.rmdir(folderPath);
}

const downloadFolderPath = path.join(process.env['GITHUB_WORKSPACE'], 'dotnet');
deleteFolder(downloadFolderPath).catch(err => {
  console.error(err);
  process.exit(1);
});
