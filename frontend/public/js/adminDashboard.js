const fetchAllOrders = async () => {
  try {
    const { data, status } = await axios.get("http://localhost:8000/api/order");
    if (status === 200) {
      data.message.forEach((order) => {
        document.querySelector(".orderList").innerHTML += `
            <tr>
    <td>${order._id}</td>
    <td>${order.buyer?.username}</td>
    <td>${order.buyer?.email}</td>
    <td>Rs. ${order.totalPrice}</td>
    <td class="admin_dashboard_order_status">${order.status}</td>
    <td>${order.createdAt}</td>
    </tr>
    `;
      });
    }
  } catch (error) {
    console.log(error);
  }
};

fetchAllOrders();
