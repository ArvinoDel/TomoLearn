
'use client';

import { Card, CardContent, Chip, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';

interface OrderData {
  planTitle: string;
  duration: string;
  userEmail: string;
  invoiceNumber: string;
  subtotal: number;
  tax: number;
  discount: number;
}

interface OrderSummaryProps {
  orderData: OrderData;
}


export default function OrderSummary({ orderData }: OrderSummaryProps) {

  const total = (orderData.subtotal).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  const totalDiscount = ((orderData.subtotal) * (orderData.discount / 100)).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  const finalTotal = ((orderData.subtotal + orderData.tax - (orderData.subtotal) * (orderData.discount / 100))).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });


  return (
    <Card className="rounded-2xl shadow-lg sticky top-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ReceiptIcon className="w-5 h-5 text-blue-600" />
          Order Summary
        </h2>

        {/* Course Info */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <SchoolIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">{orderData.planTitle}</h3>
              <p className="text-sm text-gray-600 mb-2">{orderData.duration}</p>
              <Chip
                label="Premium Access"
                size="small"
                className="bg-blue-600 text-white"
              />
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <PersonIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Customer:</span>
            <span className="text-sm font-medium text-gray-800">{orderData.userEmail}</span>
          </div>
          <div className="flex items-center gap-3">
            <ReceiptIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Invoice:</span>
            <span className="text-sm font-mono text-gray-800">{orderData.invoiceNumber}</span>
          </div>
        </div>

        <Divider className="my-4" />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{total}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium">Rp {orderData.tax.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-700">- {totalDiscount}</span>
          </div>

          <Divider className="my-3" />

          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="font-bold text-blue-600">{finalTotal}</span>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-6 bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="ri-shield-check-line text-green-600"></i>
            <span className="font-semibold text-green-700">30-Day Money Back Guarantee</span>
          </div>
          <p className="text-xs text-green-600">Not satisfied? Get a full refund within 30 days of purchase.</p>
        </div>

        {/* Features Included */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-3">What's Included:</h4>
          <ul className="space-y-2">
            {[
              'AI-powered personalized lessons',
              'Interactive speaking practice',
              'Progress tracking & certificates',
              '24/7 customer support',
              'Mobile & desktop access'
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <i className="ri-check-line text-green-600 w-4 h-4"></i>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
