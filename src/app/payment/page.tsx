
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Chip,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OrderSummary from './OrderSummary';
import PaymentMethods from './PaymentMethods';
import SecurityBadge from './SecurityBadge';
import CountdownTimer from './CountdownTimer';

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState('select'); // select, processing, success
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

  const orderData = {
    planTitle: "Japanese N5 Mastery – 1 Month Access",
    duration: "30 days unlimited access",
    userEmail: "user@example.com",
    invoiceNumber: "INV-2024-001234",
    subtotal: 79000,
    tax: 1000,
    discount: 30, // Diskon dalam persen
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedMethod(method);
    if (method === 'qris') {
      setQrCodeGenerated(true);
    }
  };

  const handlePayNow = async () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      setLoading(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

      const originalPrice = orderData.subtotal; // 79000 (harga sebelum diskon)
    const discountAmount = Math.round((originalPrice * orderData.discount) / 100); // 30% dari 79000 = 23700
    const priceAfterDiscount = originalPrice - discountAmount; // 79000 - 23700 = 55300
    const totalPayment = priceAfterDiscount + orderData.tax; // 55300 + 1000 = 56300

    const formatCurrency = (amount: number): string => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(amount);
    };

    const numberToWords = (num: number): string => {
      if (num === 56300) return 'lima puluh enam ribu tiga ratus rupiah';
      if (num === 79000) return 'tujuh puluh sembilan ribu rupiah';
      if (num === 23700) return 'dua puluh tiga ribu tujuh ratus rupiah';

      // Simplified conversion - bisa dikembangkan lebih lanjut
      return `${formatCurrency(num).toLowerCase().replace('rp', '').replace('.', '').trim()} rupiah`;
    };

    // Generate invoice number and date
    const invoiceNumber = orderData.invoiceNumber || `INV-${Date.now().toString().slice(-8)}`;
    const currentDate = new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const currentTime = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });

  if (paymentStep === 'success') {
    // Kalkulasi harga berdasarkan orderData yang sudah ada

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircleIcon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-1">Payment Successful!</h2>
                  <p className="text-blue-100 text-sm">Invoice/Struk Pembayaran</p>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="p-6">
                {/* Invoice Info */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Invoice No:</span>
                    <span className="text-sm font-semibold text-gray-800">{invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Tanggal:</span>
                    <span className="text-sm text-gray-800">{currentDate}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Waktu:</span>
                    <span className="text-sm text-gray-800">{currentTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm text-gray-800">{orderData.userEmail}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-gray-300 my-4"></div>

                {/* Product Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Detail Pembelian</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{orderData.planTitle}</p>
                        <p className="text-sm text-gray-600">{orderData.duration}</p>
                        <p className="text-xs text-gray-500 mt-1">Akses penuh ke semua materi pembelajaran</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 line-through">{formatCurrency(originalPrice)}</p>
                        <p className="font-semibold text-gray-800">{formatCurrency(priceAfterDiscount)}</p>
                        <p className="text-xs text-green-600 font-medium">Hemat {orderData.discount}%</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Qty:</span>
                        <span className="text-gray-800">1x</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Harga setelah diskon:</span>
                        <span className="text-gray-800">{formatCurrency(priceAfterDiscount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-gray-300 my-4"></div>

                {/* Payment Summary */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-800">{formatCurrency(originalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Diskon ({orderData.discount}%):</span>
                    <span className="text-green-600">-{formatCurrency(discountAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Biaya admin:</span>
                    <span className="text-gray-800">{formatCurrency(orderData.tax)}</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total Pembayaran:</span>
                      <span className="text-lg font-bold text-blue-600">{formatCurrency(totalPayment)}</span>
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-xs text-gray-500">
                        ({numberToWords(totalPayment)})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <CheckCircleIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800">Pembayaran Berhasil</p>
                        <p className="text-xs text-green-600">Via Digital Payment</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="contained"
                    fullWidth
                    className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
                    onClick={() => window.location.href = '/courses'}
                  >
                    Start Learning
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl"
                    onClick={() => window.print()}
                  >
                    Print Invoice
                  </Button>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Terima kasih atas pembelian Anda!
                  </p>
                  <p className="text-xs text-gray-500">
                    Akses course akan aktif dalam beberapa menit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">Secure payment powered by advanced encryption</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <OrderSummary orderData={orderData} />
          </div>

          {/* Payment Section */}
          <div className="order-1 lg:order-2">
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <LockIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Secured Payment</span>
                </div>

                <PaymentMethods
                  selectedMethod={selectedMethod}
                  onMethodSelect={handlePaymentMethodSelect}
                />

                {/* Payment Instructions */}
                <div className="mt-6">
                  {selectedMethod === 'qris' && qrCodeGenerated && (
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <img
                          src="https://readdy.ai/api/search-image?query=QR%20code%20payment%20interface%20modern%20clean%20design%20with%20scanning%20lines%20and%20payment%20icons%2C%20minimalist%20white%20background&width=200&height=200&seq=qr001&orientation=squarish"
                          alt="QR Code"
                          className="w-40 h-40 object-contain"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Scan QR code with your mobile banking app</p>
                      <CountdownTimer initialTime={900} />
                      <Button
                        variant="outlined"
                        fullWidth
                        className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-50"
                        onClick={handlePayNow}
                      >
                        I've Completed Payment
                      </Button>
                    </div>
                  )}

                  {selectedMethod === 'va' && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Virtual Account Number</h4>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-lg font-bold text-gray-800">8077 0123 4567 8901</span>
                          <Button
                            size="small"
                            startIcon={<ContentCopyIcon />}
                            onClick={() => copyToClipboard('8077012345678901')}
                            className="text-blue-600"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <p>1. Transfer exact amount to the virtual account number above</p>
                        <p>2. Payment will be confirmed automatically</p>
                        <p>3. Keep your transaction receipt</p>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'card' && (
                    <div className="space-y-4">
                      <TextField
                        fullWidth
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        variant="outlined"
                        className="bg-white"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          label="Expiry Date"
                          placeholder="MM/YY"
                          variant="outlined"
                          className="bg-white"
                        />
                        <TextField
                          label="CVV"
                          placeholder="123"
                          variant="outlined"
                          className="bg-white"
                        />
                      </div>
                      <TextField
                        fullWidth
                        label="Cardholder Name"
                        placeholder="John Doe"
                        variant="outlined"
                        className="bg-white"
                      />
                    </div>
                  )}
                </div>

                {/* Pay Button */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handlePayNow}
                  disabled={loading}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    `Pay Now - Rp ${formatCurrency(totalPayment)}`
                  )}
                </Button>

                <SecurityBadge />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
