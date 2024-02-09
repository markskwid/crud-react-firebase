export const isNameValid = (name) => {
  //pattern to make sure that the string is all alpha and white space only
  const nameRegex = /^[A-Za-z\s]+$/i;
  /** return true if the length is less than 8 and 
		 and if didn't pass the test for only alphabet**/
  return name.length < 8 || !nameRegex.test(name);
};

export const isDuplicate = (email, tempEmail, items) => {
  //set the tempEmail to editInfo.email if the editInfo is already set
  //const tempEmail = currentEmail;
  //check if there is no changes it also check if you are adding a new data because adding a new data means editInfo is not existing
  return tempEmail !== email && items.some((item) => item.email === email);
};

export const isEmailValid = (email) => {
  //pattern to make sure that the string should end on gmail.com
  // \. to escape the dot character
  const emailRegex = /^[A-Za-z0-9.]+@gmail\.com$/;
  return !emailRegex.test(email);
};

export const isPhoneValid = (phone) => {
  //ensure that the 2 first digit start with 09 ph number
  //then the last 9 digits will need to be digits \d{9}
  const phoneRegex = /^09\d{9}$/;
  return phone.length !== 11 || !phoneRegex.test(phone);
};

export const isPasswordValid = (password) => {
  return password.length <= 8;
};
