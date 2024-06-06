const core = require('@actions/core');
const GoogleChat = require('./chat')
const JobStatus = require('./status')

async function run() {
  try {
    const name = core.getInput('name', { required: true });
    const url = core.getInput('url', { required: true });
    const status = JobStatus.parse(core.getInput('status', { required: true }));
    const testflight = core.getInput('testflight', { required: true });
    const firebase = core.getInput('firebase', { required: true });
    const registerFirebase = core.getInput('register-firebase', { required: false });

    core.debug(`input params: name=${name}, status=${status}, url=${url}`);

    await GoogleChat.notify(name, url, status, testflight, firebase, registerFirebase);
    console.info('Sent message.')
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else if (typeof error === 'string') {
      core.setFailed(error);
    } else {
      core.setFailed('unexpected error');
    }
  }
}

run();
