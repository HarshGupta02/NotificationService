import './App.css';
import axios from 'axios';

function App() {

  const BACKEND_ROUTE = process.env.REACT_APP_BACKEND_ROUTE;

  const handleTransactionalNotification = async () => {
    console.log("In transaction");
    const priority = Math.floor(Math.random() * 3);
    try {
      await axios.post(`${BACKEND_ROUTE}/publish`, {
        messageType : "transactional-notifications",
        priority : priority
      });
    } catch (error) {
      console.log("The Error Message is ", error);
      alert(error);
    }
  }

  const handlePromotionalNotification = async () => {
    console.log("In Promotional");
    try {
      await axios.post(`${BACKEND_ROUTE}/publish`, {
        messageType : "promotional-notifications",
        priority : 0
      });
    } catch (error) {
      console.log("The Error Message is ", error);
      alert(error);
    }
  }

  return (
    <>
      <div className='App'>
        <h2>Transactional Notification Trigger</h2>
        <button onClick={handleTransactionalNotification}>Send Transactional</button>
        <h2>Promotional Notification Trigger</h2>
        <button onClick={handlePromotionalNotification}>Send Promotional</button>
      </div>
    </>
  );
}

export default App;
