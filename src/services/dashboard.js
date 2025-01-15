export const fetchOrderStats = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalOrders: 156,
          pendingOrders: 8,
          completedOrders: 142,
          cancelledOrders: 6
        });
      }, 1000);
    });
  };
  
  export const fetchRecentOrders = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            customerName: 'John Doe',
            items: ['Pizza Margherita', 'Coke'],
            total: 24.99,
            status: 'Pending',
            time: '10 mins ago'
          },
          {
            id: '2',
            customerName: 'Jane Smith',
            items: ['Chicken Burger', 'Fries', 'Sprite'],
            total: 18.50,
            status: 'Delivered',
            time: '25 mins ago'
          },
          {
            id: '3',
            customerName: 'Mike Johnson',
            items: ['Pasta Alfredo', 'Garlic Bread'],
            total: 29.99,
            status: 'In Progress',
            time: '40 mins ago'
          }
        ]);
      }, 1000);
    });
  };