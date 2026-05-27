'use client';

import {Player} from '@remotion/player';
import {MaxiExplainer, FPS, DURATION_FRAMES, WIDTH, HEIGHT} from '@/remotion/MaxiExplainer';

export default function MaxiPlayer() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-arc-dim shadow-arc-soft">
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
        style={{width: '100%', height: 'auto'}}
      />
    </div>
  );
}
