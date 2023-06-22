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
  const convertedData = JSON.stringify(data, null, 2);
  await fs.writeFile(resolve(__dirname, ACTIVITIES_FILE_PATH), convertedData);
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

const addActivity = async (newActivity) => {
  const activities = await readActivities();
  const newActivityWithId = {
    id: activities[activities.length - 1].id + 1,
    ...newActivity,
  };
  
  const newActivities = [...activities, newActivityWithId];

  await writeActivities(newActivities);
};

const updateActivity = async (id, newActivity) => {
  const activities = await readActivities();
  const newActivityWithId = { id, ...newActivity };

  const index = activities.findIndex((activity) => activity.id === id);
  if (index === -1) return null;

  // Forma 1:
  // const newArray = activities.reduce((arr, currentActivity) => {
  //   if (currentActivity.id === newActivityWithId.id) {
  //     return [...arr, newActivityWithId];
  //   }
  //   return [...arr, currentActivity];
  // }, []);

  // Forma 2:
  const newArray = activities.map((activity) => {
    if (activity.id === newActivityWithId.id) {
      return newActivityWithId;
    }
    return activity;
  });

  await writeActivities(newArray);
  return newActivityWithId;
};

const deleteActivity = async (id) => {
  const activities = await readActivities();
  const updatedActivity = activities.filter((activity) => activity.id !== id);

  await writeActivities(updatedActivity)
};

module.exports = {
  getAllActivities,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity,
}