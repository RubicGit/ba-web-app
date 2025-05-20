export const addEvent = async (req, res) => {
  const userId = req.userId;

  // requests all event data

  // creates new event doc using the data
};

export const removeEvent = async (req, res) => {
  const userId = req.userId;

  // requests the event id

  // finds event by id

  // removes the event from the database

  // updates the rendered events data
};

export const editEvent = async (req, res) => {
  const userId = req.userId;

  // takes the input event id

  // takes the input values

  // finds event by id

  // updates the input values of each prop
  // (its the original data by default so if
  // there is no change, its going to remain
  // the same)
};

export const toggleGlobal = async (req, res) => {
  const userId = req.userId;

  // takes input event id

  // sets global to true or false depending
  // the previous value
};
