const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}


module.exports = hashPassword