import React from "react";
import axios from "axios";

import Card from "../components/Card";

function Orders() {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://6242c676b6734894c1562a63.mockapi.io/orders")
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
      setIsLoading(false)
      } catch (error) {
        alert("Ошибка при запросе заказов")
        console.error(error);
      }
      
    })()    
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
      {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
          loading={isLoading}
          key={index}
          {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders ;
