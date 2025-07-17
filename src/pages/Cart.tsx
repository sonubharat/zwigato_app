import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, CreditCard, Smartphone, Truck } from 'lucide-react';

function Cart() {
  const { state, dispatch } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | null>(null);
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    alert('Order placed successfully!');
    setIsCheckingOut(false);
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some delicious items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-2xl font-bold mb-8">Your Cart</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-teal-600 font-bold">₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-600">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-teal-600">₹{state.total.toFixed(2)}</span>
              </div>
            </div>
            {!isCheckingOut ? (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="mt-4">
                <h4 className="font-semibold mb-3">Select Payment Method</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`w-full p-3 flex items-center rounded-lg border ${
                      paymentMethod === 'upi' ? 'border-teal-600 bg-teal-50' : 'border-gray-200'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    UPI Payment
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-3 flex items-center rounded-lg border ${
                      paymentMethod === 'card' ? 'border-teal-600 bg-teal-50' : 'border-gray-200'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Card Payment
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full p-3 flex items-center rounded-lg border ${
                      paymentMethod === 'cod' ? 'border-teal-600 bg-teal-50' : 'border-gray-200'
                    }`}
                  >
                    <Truck className="w-5 h-5 mr-2" />
                    Cash on Delivery
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <form onSubmit={handlePayment} className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@upi"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Pay ₹{state.total.toFixed(2)}
                    </button>
                  </form>
                )}

                {paymentMethod === 'card' && (
                  <form onSubmit={handlePayment} className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          placeholder="MM/YY"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="text"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          placeholder="123"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                      <input
                        type="text"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        placeholder="John Doe"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Pay ₹{state.total.toFixed(2)}
                    </button>
                  </form>
                )}

                {paymentMethod === 'cod' && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-4">Pay with cash upon delivery.</p>
                    <button
                      onClick={handlePayment}
                      className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;