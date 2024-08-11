"use client"
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const QRCodeReader = () => {
  const [result, setResult] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        if (videoInputDevices.length > 0) {
          const firstDeviceId = videoInputDevices[0].deviceId;
          codeReader.decodeFromVideoDevice(firstDeviceId, videoRef.current, (result, error) => {
            if (result) {
              setResult(result.text);
            }
            if (error) {
              console.error(error);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    startScanner();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} />
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default QRCodeReader;
