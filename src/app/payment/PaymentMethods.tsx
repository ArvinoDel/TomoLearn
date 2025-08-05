
'use client';

import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}

export default function PaymentMethods({ selectedMethod, onMethodSelect }: PaymentMethodsProps) {
  const [expandedPanel, setExpandedPanel] = useState<string>('qris');

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : '');
    if (isExpanded) {
      onMethodSelect(panel);
    }
  };

  const paymentMethods = [
    {
      id: 'qris',
      title: 'QRIS',
      subtitle: 'Scan QR code with any banking app',
      icon: 'ri-qr-code-line',
      badge: 'Instant',
      color: 'bg-blue-500'
    },
    {
      id: 'ewallet',
      title: 'E-Wallet',
      subtitle: 'GoPay, OVO, Dana, ShopeePay',
      icon: 'ri-wallet-line',
      badge: 'Popular',
      color: 'bg-green-500'
    },
    {
      id: 'va',
      title: 'Virtual Account',
      subtitle: 'BCA, BNI, Mandiri, BRI',
      icon: 'ri-bank-line',
      badge: 'Secure',
      color: 'bg-purple-500'
    },
    {
      id: 'card',
      title: 'Credit/Debit Card',
      subtitle: 'Visa, Mastercard, JCB',
      icon: 'ri-bank-card-line',
      badge: 'International',
      color: 'bg-orange-500'
    }
  ];

  const ewalletOptions = [
    { name: 'GoPay', logo: 'ri-smartphone-line', color: 'bg-green-600' },
    { name: 'OVO', logo: 'ri-wallet-2-line', color: 'bg-purple-600' },
    { name: 'Dana', logo: 'ri-money-dollar-circle-line', color: 'bg-blue-600' },
    { name: 'ShopeePay', logo: 'ri-shopping-bag-line', color: 'bg-orange-600' }
  ];

  const bankOptions = [
    { name: 'BCA', code: '014', color: 'bg-blue-600' },
    { name: 'BNI', code: '009', color: 'bg-orange-600' },
    { name: 'Mandiri', code: '008', color: 'bg-yellow-600' },
    { name: 'BRI', code: '002', color: 'bg-blue-800' }
  ];

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800 mb-4">Select Payment Method</h3>
      
      {paymentMethods.map((method) => (
        <Accordion 
          key={method.id}
          expanded={expandedPanel === method.id}
          onChange={handleAccordionChange(method.id)}
          className="rounded-xl shadow-sm border border-gray-200 before:hidden"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="hover:bg-gray-50 rounded-xl"
          >
            <div className="flex items-center gap-4 w-full">
              <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                <i className={`${method.icon} text-white text-lg`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800">{method.title}</span>
                  <Chip 
                    label={method.badge} 
                    size="small" 
                    variant="outlined"
                    className="text-xs"
                  />
                </div>
                <p className="text-sm text-gray-600">{method.subtitle}</p>
              </div>
            </div>
          </AccordionSummary>
          
          <AccordionDetails className="pt-0">
            {method.id === 'qris' && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-600 mb-4">Click to generate QR code for payment</p>
                <Button 
                  variant="contained" 
                  className="bg-blue-600 hover:bg-blue-700 rounded-lg"
                  onClick={() => onMethodSelect('qris')}
                >
                  Generate QR Code
                </Button>
              </div>
            )}

            {method.id === 'ewallet' && (
              <div className="grid grid-cols-2 gap-3">
                {ewalletOptions.map((wallet) => (
                  <Button
                    key={wallet.name}
                    variant="outlined"
                    className="p-4 border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl transition-all"
                    onClick={() => onMethodSelect('ewallet')}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 ${wallet.color} rounded-lg flex items-center justify-center`}>
                        <i className={`${wallet.logo} text-white`}></i>
                      </div>
                      <span className="text-sm font-medium">{wallet.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {method.id === 'va' && (
              <div className="grid grid-cols-2 gap-3">
                {bankOptions.map((bank) => (
                  <Button
                    key={bank.name}
                    variant="outlined"
                    className="p-4 border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl transition-all"
                    onClick={() => onMethodSelect('va')}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 ${bank.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{bank.code}</span>
                      </div>
                      <span className="text-sm font-medium">{bank.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {method.id === 'card' && (
              <div className="text-center py-4">
                <div className="flex justify-center gap-4 mb-4">
                  {['Visa', 'Mastercard', 'JCB'].map((card) => (
                    <div key={card} className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">{card}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Secure card payment with 3D authentication</p>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
