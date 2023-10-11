import '../styles/FrontPage.css';
import venues from '../data/venues';

const limitedVenues = venues.slice(0, 5);

const FrontPage = () => {
  return (
    <div className="frontPage">
      <div className="heading">
        <h1>Welcome to Areena</h1>
        <p>Be the Star of your Show.</p>
      </div>
      <p className="register">^^Register now to book your venue^^ </p>
      <div className="content">
        <div className="content-left">
          <h1>Exclusive locations...</h1>
          {limitedVenues.map((venue) => (
            <div className="venue" key={venue}>
              <h3>{venue}</h3>
            </div>
          ))}
        </div>
        <div>
          <div className="content-right">
            <h1>...at your fingertips</h1>
            <p>Hassle free booking </p>
            <p> Easy code access</p>
          </div>
        </div>
      </div>
      <div className="contact">
        <h1>Contact us</h1>
        <p>Phone: 123456789</p>
        <p>Email: metropolia@metropolia</p>
        copywrite@metropolia
      </div>
    </div>
  );
};

export default FrontPage;
