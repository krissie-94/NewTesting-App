import React, { useEffect, useState } from 'react';

function Header() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // API Request 'This will fetch a random user information and list them as specified'
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div>
        <h1>Data from API:</h1>
        <ul>
          {data.map((item) => (
            <li key={item.login.uuid}>
              <strong>Name:</strong> {item.name.first} {item.name.last}
              <br />
              <strong>Gender:</strong> {item.gender}
              <br />
              <strong>Location:</strong> {item.location.city}, {item.location.state}, {item.location.country}
              <br/>
              <strong>Email:</strong> {item.email},
              <br/>
              <strong>Picture:</strong>
              <br/> <img src={item.picture.large}/>,
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;