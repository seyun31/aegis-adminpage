import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
    onScan: (result: string) => void;
    onClose: () => void;
}

const QRScannerComponent: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [scanner, setScanner] = useState<QrScanner | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!videoRef.current) return;

        const qrScanner = new QrScanner(
            videoRef.current,
            (result) => {
                onScan(result.data);
                qrScanner.stop();
            },
            {
                highlightScanRegion: true,
                highlightCodeOutline: true,
            }
        );

        setScanner(qrScanner);

        qrScanner.start().catch((err) => {
            console.error('QR Scanner Error:', err);
            setError('카메라에 접근할 수 없습니다. 카메라 권한을 확인해주세요.');
        });

        return () => {
            qrScanner.stop();
            qrScanner.destroy();
        };
    }, [onScan]);

    const handleClose = () => {
        if (scanner) {
            scanner.stop();
            scanner.destroy();
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">QR 코드 스캔</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                ) : (
                    <div className="relative">
                        <video
                            ref={videoRef}
                            className="w-full h-64 bg-gray-200 rounded"
                        />
                        <div className="text-center mt-2 text-sm text-gray-600">
                            QR 코드를 카메라에 비춰주세요
                        </div>
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRScannerComponent;