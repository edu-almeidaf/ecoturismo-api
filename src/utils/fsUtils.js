const fs = require('fs/promises');
const { join, resolve } = require('path');

const ACTIVITIES_FILE_PATH = '../activities.json';

const readActivities = async () => {
    const data = await fs.readFile(join(__dirname, ACTIVITIES_FILE_PATH), 'utf-8');

    if (!data) {
      return [];
    }
    return JSON.parse(data);
}

const writeActivities = async (data) => {
  const convertedData = JSON.stringify(data);
  await fs.writeFile(resolve(__dirname, path), convertedData);
}

const getAllActivities = async () => {
  const activities = await readActivities();

  return activities;
}

const getActivityById = async (id) => {
  const activities = await readActivities();
  const findActivity = activities.find((activity) => activity.id === id);
  return findActivity;
}

module.exports = {
  getAllActivities,
  getActivityById,
}