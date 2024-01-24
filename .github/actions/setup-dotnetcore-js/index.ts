import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

async function run() {
  try {
    const version = core.getInput('version', { required: true }) || '3.1.0';
    const dotnetPath = `${process.env['RUNNER_TEMP']}/dotnet`;

    await io.mkdirP(dotnetPath); // Ensure the directory exists

    const downloadUrl = `https://download.visualstudio.microsoft.com/download/pr/76cabfc3-6010-472e-a5b3-bfe854a24c4e/1810de5554f8cd9825b47ae46b9990b4/dotnet-runtime-${version}-rhel.6-x64.tar.gz`;

    await exec.exec('wget', [downloadUrl]);
    await exec.exec('tar', ['-zxf', `dotnet-runtime-${version}-rhel.6-x64.tar.gz`, '-C', dotnetPath]);

    // Set the output variable
    core.setOutput('dotnet-path', dotnetPath);

    // Optionally, print out the version of dotnet
    await exec.exec(`${dotnetPath}/dotnet`, ['--version']);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();
