import React, { useEffect, useState } from 'react';

type Props = {}

function checkout({}: Props) {
    const [cart, setCart] = useState([]);
    let subTotal = cart.reduce((p, c) => p + (c.price * c.quantity), 0);
    let tax = Number((13 / 100 * subTotal).toFixed(2));
    useEffect(() => {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }, [])
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2 p-8 bg-white rounded shadow max-sm:overflow-scroll">
          <h2 className="text-2xl font-bold mb-8">Checkout</h2>
  
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Billing Address */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
              {/* Input fields for billing information */}
              <input type="text" placeholder="Full Name" className="w-full mb-2 p-2 rounded border border-gray-300" />
              <input type="text" placeholder="Address" className="w-full mb-2 p-2 rounded border border-gray-300" />
              <input type="text" placeholder="Postal Code" className="w-full mb-2 p-2 rounded border border-gray-300" />
              <input type="number" placeholder="Phone Number" className="w-full mb-2 p-2 rounded border border-gray-300" />
              <input type="email" placeholder="Email" className="w-full mb-2 p-2 rounded border border-gray-300" />
            </div>
  
            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
              {/* Input fields for shipping information */}
              <input type="text" placeholder="Full Name" className="w-full mb-2 p-2 rounded border border-gray-300" />
              <input type="text" placeholder="Address" className="w-full mb-2 p-2 rounded border border-gray-300" />
              <input type="text" placeholder="Postal Code" className="w-full mb-2 p-2 rounded border border-gray-300" />
              <input type="number" placeholder="Phone Number" className="w-full mb-2 p-2 rounded border border-gray-300" />
              <input type="email" placeholder="Email" className="w-full mb-2 p-2 rounded border border-gray-300" />
            </div>
          </div>
  
          {/* Payment Method Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            {/* Credit card form or placeholder */}
            <div class="mb-4">
              <label for="expiry" class="block text-sm font-bold text-gray-700">Credit Card Information</label>
              <input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Credit Card Number" />
            </div>
  
            <div class="mb-4">
              <label for="cvv" class="block text-sm font-bold text-gray-700">CVV</label>
              <input type="text" id="cvv" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="CVV" />
            </div>
            <div class="mb-4">
              <label for="expiry" class="block text-sm font-bold text-gray-700">Card Expiry</label>
              <input type="text" id="expiry" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="MM / YY" />
            </div>
          </div>
  
          {/* Order Summary Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className='min-w-fit'>
              <div className='flex justify-between items-center bg-slate-100'>
                <div className='w-[250px]'>Title</div>
                <div className='w-[70px] ml-3 text-center'>Quantity</div>
                <div className='w-[50px] text-center'>Price</div>
                <div className='w-[50px] text-center'>Q x P</div>
              </div>
              {cart.map(v =>
                <div className='flex justify-between items-center'>
                  <div className='w-[250px]'>{v.title}</div>
                  <div className='w-[70px] ml-3 text-center'>{v.quantity}</div>
                  <div className='w-[50px] text-center'>{v.price}</div>
                  <div className='w-[50px] text-center'>{v.price * v.quantity}</div>
                </div>
              )}
              <div className='border-2 border-gray-300 p-2 mt-4 w-[50%]'>
                <div className='flex justify-between items-center'>
                  <div className='w-[250px]'>Sub Total</div>
                  <div className='w-[50px] text-center'>{subTotal}</div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='w-[250px]'>Shipping Fees</div>
                  <div className='w-[50px] text-center'>0</div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='w-[250px]'>Tax</div>
                  <div className='w-[50px] text-center'>{tax}</div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='w-[250px]'>Total Amount</div>
                  <div className='w-[50px] text-center'>{subTotal + tax}</div>
                </div>
              </div>
  
            </div>
            {/* Add more items and pricing details */}
          </div>
  
          {/* Place Order Button */}
          <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
            Place Order
          </button>
        </div>
      </div>
    );
}

export default checkout