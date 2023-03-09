import React from "react";

const Home = () => {

    const yourName  = localStorage.getItem('name');
  return (
    <div>
      <h1>Twoje imie to {yourName}</h1>
    </div>
  );
};

export default Home;
