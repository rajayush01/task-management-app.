import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Home, ShoppingBag, Clock, Heart, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import debounce from 'lodash/debounce';
import Pizza from "../assets/Margreta.jpg";
import Burger from "../assets/Chicken-Burgers.jpg";
import Salad from "../assets/caesar-salad.jpg";
import Pasta from "../assets/Pasta-Alfredo.jpg"

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [orders, setOrders] = useState([
        { id: 1, item: 'Veggie Supreme Pizza', date: '2024-01-13', status: 'Delivered', price: '$15.99' },
        { id: 2, item: 'Double Cheeseburger', date: '2024-01-12', status: 'In Transit', price: '$12.99' },
        { id: 3, item: 'Caesar Salad', date: '2024-01-11', status: 'Delivered', price: '$8.99' },
        { id: 4, item: 'Pasta Alfredo', date: '2024-01-10', status: 'Cancelled', price: '$13.99' },
        { id: 5, item: 'Chicken Wings', date: '2024-01-09', status: 'Delivered', price: '$11.99' },
        { id: 6, item: 'Greek Salad', date: '2024-01-08', status: 'In Transit', price: '$9.99' },
        { id: 7, item: 'Mushroom Pizza', date: '2024-01-07', status: 'Delivered', price: '$14.99' },
    ]);

    const featuredItems = [
        { id: 1, name: 'Margherita Pizza', price: '$12.99', image: Pizza },
        { id: 2, name: 'Chicken Burger', price: '$8.99', image: Burger },
        { id: 3, name: 'Caesar Salad', price: '$7.99', image: Salad },
        { id: 4, name: 'Pasta Alfredo', price: '$11.99', image: Pasta },
    ];

    // Search and filter logic
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.item.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Sorting logic
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        switch (sortBy) {
            case 'item':
                return sortOrder === 'asc'
                    ? a.item.localeCompare(b.item)
                    : b.item.localeCompare(a.item);
            case 'date':
                return sortOrder === 'asc'
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            case 'price':
                const priceA = parseFloat(a.price.replace('$', ''));
                const priceB = parseFloat(b.price.replace('$', ''));
                return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            default:
                return 0;
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
    const paginatedOrders = sortedOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Debounced search handler
    const debouncedSearch = debounce((value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page on search
    }, 300);

    const handleSearchChange = (e) => {
        debouncedSearch(e.target.value);
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name || user?.email}!
                </h1>
                <p className="text-gray-600 mt-1">What would you like to order today?</p>
            </div>


            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <ShoppingBag className="h-8 w-8 text-orange-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Orders</p>
                            <p className="text-lg font-semibold text-gray-900">12</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <Clock className="h-8 w-8 text-orange-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Pending</p>
                            <p className="text-lg font-semibold text-gray-900">2</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <Heart className="h-8 w-8 text-orange-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Favorites</p>
                            <p className="text-lg font-semibold text-gray-900">5</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <Home className="h-8 w-8 text-orange-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Saved Addresses</p>
                            <p className="text-lg font-semibold text-gray-900">2</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Items */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {featuredItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <p className="text-orange-600 font-semibold mt-1">{item.price}</p>
                            <button className="mt-2 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                onChange={handleSearchChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        >
                            <option value="all">All Status</option>
                            <option value="Delivered">Delivered</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Orders Table */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('item')}
                            >
                                <div className="flex items-center">
                                    Order
                                    {sortBy === 'item' && (
                                        <ChevronDown className={`ml-1 h-4 w-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('date')}
                            >
                                <div className="flex items-center">
                                    Date
                                    {sortBy === 'date' && (
                                        <ChevronDown className={`ml-1 h-4 w-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('price')}
                            >
                                <div className="flex items-center">
                                    Price
                                    {sortBy === 'price' && (
                                        <ChevronDown className={`ml-1 h-4 w-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                                    )}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {order.item}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing page <span className="font-medium">{currentPage}</span> of{' '}
                                <span className="font-medium">{totalPages}</span>
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPage(idx + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === idx + 1
                                                ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                                                : 'bg-white text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* No Results Message */}
                {paginatedOrders.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">No orders found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Optional: Infinite Scroll Implementation */}
            {/* Note: This is an alternative to pagination that you can choose to implement */}
            {/* 
            const [loading, setLoading] = useState(false);
            const [hasMore, setHasMore] = useState(true);
            
            const loadMoreItems = async () => {
                if (loading || !hasMore) return;
                setLoading(true);
                try {
                    // Fetch more items from API
                    // Update orders state
                    // Update hasMore based on if there are more items
                } catch (error) {
                    console.error('Error loading more items:', error);
                } finally {
                    setLoading(false);
                }
            };

            useEffect(() => {
                const handleScroll = () => {
                    if (
                        window.innerHeight + document.documentElement.scrollTop
                        === document.documentElement.offsetHeight
                    ) {
                        loadMoreItems();
                    }
                };

                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
            }, [loading, hasMore]);
            */}
        </div>
    );
};

export default Dashboard;