let orderTab = "pending";

const fetchAdminProductsByStatus = async () => {
  try {
    const { data, status } = await axios.get(
      `http://localhost:8000/api/order?status=${orderTab}`
    );
    document.querySelector(".orderAllList").innerHTML = "";
    if (status === 200) {
      data.message.forEach((order) => {
        document.querySelector(".orderAllList").innerHTML += `
        
        
        <tr>
        <td>${order._id}</td>
        <td>${order.buyer?.username}</td>
        <td>${order.buyer?.email}</td>
        <td>Rs.${order?.totalPrice}</td>
        <td> ${order.createdAt.split("T")[0]}  </td>
    </tr>

        
        `;
      });
    }
  } catch (error) {}
};

document.querySelectorAll(".statusTab").forEach((elm) => {
  elm.addEventListener("click", () => {
    // console.log(elm);
    document.querySelectorAll(".statusTab").forEach((el) => {
      el.classList.remove("active");
    });
    elm.classList.add("active");
    orderTab = elm.getAttribute("data-status");
    fetchAdminProductsByStatus();
  });
});

fetchAdminProductsByStatus();
