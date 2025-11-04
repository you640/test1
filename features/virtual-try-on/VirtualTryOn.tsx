import React, { useRef, useState, useCallback, useEffect } from 'react';

// --- ROZŠÍRENÉ MOCK DATA S OBRÁZKAMI PRE PREKRYTIE ---
const mockHairstyles = [
    { id: 1, name: 'Krátky Bob', thumbnailUrl: 'https://picsum.photos/seed/hair1/200/200', overlayUrl: 'https://i.ibb.co/CKQxYmP/hair1-bob.png' },
    { id: 2, name: 'Dlhé Vlny', thumbnailUrl: 'https://picsum.photos/seed/hair2/200/200', overlayUrl: 'https://i.ibb.co/Fqg4Pqn/hair2-waves.png' },
    { id: 3, name: 'Platinová Blond', thumbnailUrl: 'https://picsum.photos/seed/hair3/200/200', overlayUrl: 'https://i.ibb.co/3MJwz7C/hair3-blonde.png' },
    { id: 4, name: 'Moderný Pixie', thumbnailUrl: 'https://picsum.photos/seed/hair4/200/200', overlayUrl: 'https://i.ibb.co/GQLM32K/hair4-pixie.png' },
    { id: 5, name: 'Balayage Brunette', thumbnailUrl: 'https://picsum.photos/seed/hair5/200/200', overlayUrl: 'https://i.ibb.co/6w2m1PR/hair5-balayage.png' },
    { id: 6, name: 'Ohnivá Červená', thumbnailUrl: 'https://picsum.photos/seed/hair6/200/200', overlayUrl: 'https://i.ibb.co/tLWK1fM/hair6-red.png' },
];

// Deklarácia pre MediaPipe, ktorý je načítaný z CDN
declare const window: any;

type CameraStatus = 'initial' | 'loading' | 'active' | 'error';
type FacingMode = 'user' | 'environment';

// --- KOMPONENTY PRE STAVY ---
const InitialState: React.FC<{ onStart: () => void; isModelLoading: boolean; }> = ({ onStart, isModelLoading }) => (
    <div className="text-center">
        {isModelLoading ? (
            <>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold mx-auto"></div>
                <p className="mt-4 text-gold">Načítavam AI model...</p>
            </>
        ) : (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                <p className="mt-4 text-brand-light/80">Povoľte prístup ku kamere a začnite.</p>
                <button onClick={onStart} className="mt-6 bg-gold text-brand-dark font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors">
                    Spustiť Kameru
                </button>
            </>
        )}
    </div>
);


const LoadingState: React.FC = () => (
    <div className="absolute inset-0 bg-brand-dark/50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
        <p className="mt-4 text-gold">Spúšťam kameru...</p>
    </div>
);

const ErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <div className="text-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3 className="mt-2 text-lg font-medium text-red-400">Chyba</h3>
        <p className="mt-1 text-sm text-brand-light/80">{message}</p>
        <button onClick={onRetry} className="mt-6 bg-gold text-brand-dark font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">
            Skúsiť znova
        </button>
    </div>
);

const VirtualTryOn: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const faceLandmarker = useRef<any>(null);

    const [cameraStatus, setCameraStatus] = useState<CameraStatus>('initial');
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [facingMode, setFacingMode] = useState<FacingMode>('user');
    const [error, setError] = useState<string | null>(null);
    const [selectedHairstyleId, setSelectedHairstyleId] = useState<number | null>(null);
    const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({ display: 'none' });

    // --- INICIALIZÁCIA MEDIAPIPE MODELU ---
    useEffect(() => {
        const initMediaPipe = async () => {
            try {
                // Poll for the MediaPipe library to be loaded on the window object
                if (window.tasks && window.tasks.vision) {
                    const vision = await window.tasks.vision.FilesetResolver.forVisionTasks(
                        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
                    );
                    faceLandmarker.current = await window.tasks.vision.FaceLandmarker.createFromOptions(vision, {
                        baseOptions: {
                            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                            delegate: "GPU",
                        },
                        outputFaceBlendshapes: false,
                        outputFacialTransformationMatrixes: false,
                        runningMode: "VIDEO",
                        numFaces: 1,
                    });
                    console.log("Face Landmarker created successfully");
                    setIsModelLoading(false);
                } else {
                    setTimeout(initMediaPipe, 100);
                }
            } catch (e) {
                console.error("Failed to create Face Landmarker:", e);
                setError("Nepodarilo sa načítať AI model pre detekciu tváre.");
                setCameraStatus('error');
                setIsModelLoading(false);
            }
        };

        initMediaPipe();

        return () => {
            // Cleanup on unmount
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            if (faceLandmarker.current?.close) {
                faceLandmarker.current.close();
            }
        };
    }, []);

    const predictWebcam = useCallback(() => {
        if (!faceLandmarker.current || !videoRef.current || videoRef.current.readyState < 3) {
            animationFrameId.current = requestAnimationFrame(predictWebcam);
            return;
        }

        const startTimeMs = performance.now();
        const results = faceLandmarker.current.detectForVideo(videoRef.current, startTimeMs);

        if (results.faceLandmarks && results.faceLandmarks.length > 0) {
            const landmarks = results.faceLandmarks[0];
            const video = videoRef.current;
            
            // --- VÝPOČET TRANSFORMÁCIE ÚČESU ---
            const leftTemple = landmarks[70]; // ľavý spánok
            const rightTemple = landmarks[300]; // pravý spánok
            const chin = landmarks[175]; // brada
            const forehead = landmarks[10]; // stred čela

            const faceWidth = Math.sqrt(Math.pow(rightTemple.x - leftTemple.x, 2) + Math.pow(rightTemple.y - leftTemple.y, 2)) * video.videoWidth;
            
            const centerX = ((leftTemple.x + rightTemple.x) / 2) * video.videoWidth;
            const centerY = ((forehead.y + chin.y) / 2.2) * video.videoHeight; // Posunúť vyššie k čelu

            const angle = Math.atan2(rightTemple.y - leftTemple.y, rightTemple.x - leftTemple.x) * (180 / Math.PI);
            
            // Faktor pre prispôsobenie veľkosti účesu
            const scaleFactor = faceWidth / 200; // 200 je arbitrary base width
            
            setOverlayStyle({
                display: 'block',
                position: 'absolute',
                top: `${centerY}px`,
                left: `${centerX}px`,
                width: `${350 * scaleFactor}px`, // arbitrary base width for overlay image
                height: 'auto',
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                pointerEvents: 'none',
                transition: 'all 0.1s linear',
            });
        } else {
            setOverlayStyle({ display: 'none' });
        }

        animationFrameId.current = requestAnimationFrame(predictWebcam);
    }, []);


    const startCamera = useCallback(async (modeOverride?: FacingMode) => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }

        setCameraStatus('loading');
        setError(null);
        
        const currentMode = modeOverride || facingMode;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentMode } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                     setCameraStatus('active');
                     // Spustenie detekčnej slučky
                     animationFrameId.current = requestAnimationFrame(predictWebcam);
                }
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
            setError("Nepodarilo sa získať prístup ku kamere. Skontrolujte povolenia v prehliadači.");
            setCameraStatus('error');
        }
    }, [facingMode, predictWebcam]);
    
    const stopCamera = useCallback(() => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraStatus('initial');
        setOverlayStyle({ display: 'none' });
    }, []);
    
    const handleSwitchCamera = () => {
        const newMode = facingMode === 'user' ? 'environment' : 'user';
        setFacingMode(newMode);
        startCamera(newMode);
    };

    const handleCameraToggle = () => {
        if (cameraStatus === 'active') {
            stopCamera();
        } else {
            startCamera();
        }
    };


    return (
        <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
            <h1 className="text-4xl font-serif text-gold mb-2 text-center">Virtuálny Stylista</h1>
            <p className="text-lg text-brand-light/80 mb-8 text-center">Vyskúšajte si nový účes alebo farbu v reálnom čase!</p>

            <div className="w-full max-w-3xl">
                <div className="relative w-full aspect-video bg-brand-secondary rounded-lg flex items-center justify-center border-2 border-gold/30 overflow-hidden shadow-lg">
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className={`w-full h-full object-cover ${cameraStatus === 'active' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ${facingMode === 'user' ? 'transform -scale-x-100' : ''}`} 
                    />
                    
                    {cameraStatus === 'active' && selectedHairstyleId && (
                       <img
                         src={mockHairstyles.find(h => h.id === selectedHairstyleId)?.overlayUrl}
                         alt="hairstyle overlay"
                         style={overlayStyle}
                       />
                    )}
                    
                    {cameraStatus === 'initial' && <InitialState onStart={startCamera} isModelLoading={isModelLoading} />}
                    {cameraStatus === 'loading' && <LoadingState />}
                    {cameraStatus === 'error' && error && <ErrorState message={error} onRetry={() => window.location.reload()} />}
                </div>
                
                 <div className="w-full mt-4 flex justify-center space-x-4">
                    <button onClick={handleCameraToggle} className="p-3 bg-brand-secondary rounded-full text-brand-light hover:text-gold transition-colors" title={cameraStatus === 'active' ? 'Zastaviť Kameru' : 'Spustiť Kameru'}>
                        {cameraStatus === 'active' ? 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.86 15H4a2 2 0 01-2-2V8a2 2 0 012-2h1.86l2-2.143A2 2 0 0112 5.857v12.286a2 2 0 01-2.14.99l-2-2.143z" /></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        }
                    </button>
                    <button onClick={handleSwitchCamera} disabled={cameraStatus !== 'active'} className="p-3 bg-brand-secondary rounded-full text-brand-light hover:text-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Prepnúť Kameru">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" /></svg>
                    </button>
                </div>

                <div className="mt-8 w-full">
                    <h3 className="text-xl font-semibold text-gold mb-4 text-center">Vyberte si štýl</h3>
                    <div className="flex space-x-4 p-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gold/50 scrollbar-track-brand-secondary">
                        {mockHairstyles.map(style => (
                            <button 
                                key={style.id}
                                onClick={() => setSelectedHairstyleId(style.id)}
                                className={`flex-shrink-0 w-28 text-center group focus:outline-none`}
                            >
                                <img 
                                    src={style.thumbnailUrl} 
                                    alt={style.name} 
                                    className={`w-24 h-24 rounded-full object-cover mx-auto border-2 transition-all duration-300 ${selectedHairstyleId === style.id ? 'border-gold scale-105' : 'border-transparent group-hover:border-gold/50'}`}
                                />
                                <span className={`block text-sm mt-2 transition-colors ${selectedHairstyleId === style.id ? 'text-gold' : 'text-brand-light/80 group-hover:text-gold'}`}>{style.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualTryOn;