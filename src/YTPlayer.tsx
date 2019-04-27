// https://developers.google.com/youtube/iframe_api_reference

import * as React from "react";
import YouTube, { Options } from "react-youtube";
import { useState, useCallback, useEffect } from "react";

interface YouTubeProps {
  videoId: string;
  id?: string;
  className?: string;
  containerClassName?: string;
  opts?: Options;
  onReady?(event: { target: any }): void;
  onError?(event: { target: any; data: number }): void;
  onPlay?(event: { target: any; data: number }): void;
  onPause?(event: { target: any; data: number }): void;
  onEnd?(event: { target: any; data: number }): void;
  onStateChange?(event: { target: any; data: number }): void;
  onPlaybackRateChange?(event: { target: any; data: number }): void;
  onPlaybackQualityChange?(event: { target: any; data: string }): void;
}
interface Props extends YouTubeProps {
  apiRef: React.MutableRefObject<PlayerAPI>;
  opts: never;
}

export function YTPlayer({ apiRef, ...props }: Props) {
  const [player, setPlayer] = useState(null as PlayerAPI);

  const playerOnReady = useCallback(event => setPlayer(event.target), []);
  useEffect(() => {
    apiRef.current = player;
    props.onReady && props.onReady({ target: player });
  }, [apiRef, props.onReady, player]);

  return <YouTube {...props} opts={opts} onReady={playerOnReady} />;
}

const opts: Options = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    controls: 0,
    cc_load_policy: 1,
    fs: 1,
    iv_load_policy: 3,
    playsinline: 1,
    rel: 0,
    disablekb: 1,
  },
};

export interface PlayerAPI {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;

  getSphericalProperties(): object;
  setSphericalProperties(properties: object): void;

  nextVideo(): void;
  previousVideo(): void;
  playVideoAt(index: number): void;

  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setVolume(volume: number): void;
  getVolume(): number;

  setSize(width: number, height: number): object;

  getPlaybackRate(): number;
  setPlaybackRate(suggestedRate: number): void;
  getAvailablePlaybackRates(): any[];

  setLoop(loopPlaylists: boolean): void;
  setShuffle(shufflePlaylist: boolean): void;
  getVideoLoadedFraction(): number;
  getPlayerState(): number;
  getCurrentTime(): number;

  getPlaybackQuality(): YTPlaybackQuality;
  setPlaybackQuality(suggestedQuality: YTPlaybackQuality): void;
  getAvailableQualityLevels(): YTPlaybackQuality[];

  getDuration(): number;
  getVideoUrl(): string;
  getVideoEmbedCode(): string;

  getPlaylist(): any[];
  getPlaylistIndex(): number;

  addEventListener(event: YTEvent, listener: string): void;
  removeEventListener(event: YTEvent, listener: string): void;

  getIframe(): object;
  destroy(): void;
}

type YTEvent =
  | "onReady"
  | "onStateChange"
  | "onPlaybackQualityChange"
  | "onPlaybackRateChange"
  | "onError"
  | "onApiChange";

type YTPlaybackQuality =
  | "small"
  | "medium"
  | "large"
  | "hd720"
  | "hd1080"
  | "highres"
  | "default";
