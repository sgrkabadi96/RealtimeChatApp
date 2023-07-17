

export  const getSender = (loggedIn, users)=> {
    return users[0]._id === loggedIn ? users[1].name : users[0].name;
}