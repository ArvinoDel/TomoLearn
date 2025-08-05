
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
    subtotal: 199000,
    tax: 19900,
    total: 218900
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

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">Your enrollment has been confirmed</p>
              <Button 
                variant="contained" 
                fullWidth 
                className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
                onClick={() => window.location.href = '/courses'}
              >
                Start Learning
              </Button>
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
                    `Pay Now - Rp ${orderData.total.toLocaleString('id-ID')}`
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
