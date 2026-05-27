'use client';

import {Player} from '@remotion/player';
import {MaxiExplainer, FPS, DURATION_FRAMES, WIDTH, HEIGHT} from '@/remotion/MaxiExplainer';

export default function MaxiPlayer() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl glass-strong glow-arc">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-arc/40 via-transparent to-gold/30 opacity-50 blur-md -z-10" />
      <Player
        component={MaxiExplainer}
        durationInFrames={DURATION_FRAMES}
        compositionWidth={WIDTH}
        compositionHeight={HEIGHT}
        fps={FPS}
        controls
        loop
        autoPlay
        acknowledgeRemotionLicense
        style={{width: '100%', height: 'auto', display: 'block'}}
      />
    </div>
  );
}
