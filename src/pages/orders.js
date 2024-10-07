import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firestore import
import { collection, getDocs, query, where } from 'firebase/firestore'; // Firestore methods
import { auth } from '../firebase'; // Firebase auth import

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const ordersCollection = collection(db, 'orders');
        const ordersQuery = query(ordersCollection, where('userId', '==', user.uid));
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersList = ordersSnapshot.docs.map((doc) => {
          const orderData = doc.data();
          return {
            id: doc.id,
            ...orderData,
            createdAt: orderData.createdAt ? new Date(orderData.createdAt.seconds * 1000).toLocaleDateString() : 'N/A',
          };
        });
        setOrders(ordersList);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-teal-900 text-center">Order History</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {orders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="border-b pb-4">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ${order.totalAmount}
                  </p>
                  <p>
                    <strong>Order Date:</strong> {order.createdAt}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
