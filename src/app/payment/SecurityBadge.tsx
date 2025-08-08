
'use client';

import { Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function SecurityBadge() {
  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <LockIcon className="w-4 h-4 text-green-600" />
          <span>256-bit SSL</span>
        </div>
        <div className="flex items-center gap-1">
          <SecurityIcon className="w-4 h-4 text-blue-600" />
          <span>PCI Compliant</span>
        </div>
        <div className="flex items-center gap-1">
          <VerifiedIcon className="w-4 h-4 text-purple-600" />
          <span>Bank Grade Security</span>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <p className="text-xs text-gray-500">
          Secured by <span className="font-semibold text-blue-600">TomoLearn Pay</span> • 
          <a href="/terms" className="text-blue-600 hover:underline ml-1">Terms & Conditions</a> • 
          <a href="#" className="text-blue-600 hover:underline ml-1">Refund Policy</a>
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 p-3 bg-green-50 rounded-lg">
        <i className="ri-shield-check-line text-green-600"></i>
        <span className="text-sm text-green-700 font-medium">Your payment information is fully encrypted and secure</span>
      </div>
    </div>
  );
}
