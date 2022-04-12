import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss';

function Drawer({ onRemove, onClose, items = [], opened}) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  console.log(totalPrice);
  const [orderId, setOrderId] = React.useState(null);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6242c676b6734894c1562a63.mockapi.io/orders",
        {
          items: cartItems,
        }
      );

      setOrderId(data.id);
      setIsCompleted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://6242c676b6734894c1562a63.mockapi.io/cart" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Не удалось создать заказ ");
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/cancel-btn.svg"
            alt="cancel"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})`}}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>

                  <img
                    onClick={() => onRemove(obj.id)}
                    className="cancel-btn"
                    src="/img/cancel-btn.svg"
                    alt="cancel"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round((totalPrice / 100) * 5)} руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isCompleted ? "Заказ офромлен!" : "Корзина пустая"}
            description={
              isCompleted
                ? `Ваш заказ #${orderId} будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок."
            }
            image={
              isCompleted ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
