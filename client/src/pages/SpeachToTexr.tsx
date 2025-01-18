/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { Mic, StopCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
// Import the SpeechRecognitionEvent type
type SpeechRecognitionEvent = Event & {
    results: SpeechRecognitionResultList;
};

interface CustomWindow extends Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
}

declare const window: CustomWindow;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeachToTexr = () => {
    const [error, setError] = useState('')
    const [isListening, setIsListening] = useState(false);
    const [text, setText] = useState('');
    const [recognition, setRecognition] = useState<typeof SpeechRecognition | null>(null);

    useEffect(() => {
        if (SpeechRecognition) {
            const recognitionInstance = new (SpeechRecognition as any)();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'ar-SA'; // Set language to Arabic (Saudi Arabia)
            console.log(recognitionInstance);


            recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = Array.from(event.results)
                    .map(result => (result as SpeechRecognitionResult).item(0).transcript)
                    .join('');
                console.log(transcript);
                setText(transcript);
            };

            setRecognition(recognitionInstance);
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognition) {
            recognition?.start();
            setIsListening(true);
        } else {
            setError('error')
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition?.stop();
            setIsListening(false);
        } else {
            setError('error')
        }
    }, [recognition]);

    if (!SpeechRecognition) {
        return <div>Speech recognition is not supported in this browser.</div>;
    }

    const clearText = () => {
        setText('')
        setRecognition(null);
    }
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Arabic Speech to Text Converter
                </CardTitle>
            </CardHeader>
            <CardContent>
                {error && (
                    <Alert className="mb-4 bg-red-50">
                        <AlertDescription className="text-red-600">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                        <Button
                            onClick={isListening ? stopListening : startListening}
                            className={`flex items-center space-x-2 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            {isListening ? (
                                <>
                                    <StopCircle className="w-5 h-5" />
                                    <span>Stop Recording</span>
                                </>
                            ) : (
                                <>
                                    <Mic className="w-5 h-5" />
                                    <span>Start Recording</span>
                                </>
                            )}
                        </Button>

                        <Button
                            onClick={clearText}
                            variant="outline"
                            className="border-gray-300"
                        >
                            Clear Text
                        </Button>
                    </div>

                    <div className="relative">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-48 p-4 border rounded-lg resize-none text-right"
                            dir="rtl"
                            placeholder="النص سيظهر هنا..."
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SpeachToTexr