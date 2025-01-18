import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

const ArabicImageToSpeech: React.FC = () => {
    const [imageText, setImageText] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsProcessing(true);

        try {
            const result = await Tesseract.recognize(file, 'ara');
            console.log(result);

            setImageText(result.data.text);
        } catch (error) {
            console.error('Error processing image:', error);
            setImageText('Error processing image. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(imageText);
        utterance.lang = 'ar-SA'; // Set language to Arabic
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="container mx-auto p-4 text-right" dir="rtl">
            <h1 className="text-2xl font-bold mb-4">تحويل النص من الصورة إلى كلام</h1>
            <div className="mb-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    disabled={isProcessing}
                >
                    {isProcessing ? 'جاري المعالجة...' : 'تحميل صورة'}
                </button>
            </div>
            {imageText && (
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">النص المستخرج:</h2>
                    <p className="border p-2 rounded">{imageText}</p>
                    <button
                        onClick={handleSpeak}
                        className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        نطق النص
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArabicImageToSpeech;