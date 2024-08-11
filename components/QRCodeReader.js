"use client"
import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QrCodeScanner = () => {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      const html5QrCode = new Html5Qrcode("qr-reader");

      html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText, decodedResult) => {
          console.log(`QR Code scanned: ${decodedText}`);
        },
        (errorMessage) => {
          console.error(`QR Code scan error: ${errorMessage}`);
        }
      ).catch((err) => {
        console.error(`Failed to start QR code scanning: ${err}`);
      });

      return () => {
        html5QrCode.stop().catch((err) => {
          console.error(`Failed to stop QR code scanning: ${err}`);
        });
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Scan QR Code</h1>
      <div
        id="qr-reader"
        ref={qrCodeRef}
        className="w-64 h-64 border-4 border-blue-500 rounded-lg shadow-lg"
      ></div>
      <p className="mt-4 text-gray-600">Align the QR code within the frame to scan.</p>
    </div>
  );
};

export default QrCodeScanner;
