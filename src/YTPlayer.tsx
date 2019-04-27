// https://developers.google.com/youtube/iframe_api_reference

import * as React from "react";
import YouTube from "react-youtube";
import { useState, useCallback, useEffect } from "react";

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

export function YTPlayer({ apiRef, ...props }) {
  const [player, setPlayer] = useState(null as PlayerAPI);
  const playerOnReady = useCallback((event: { target: PlayerAPI }) => {
    setPlayer(event.target);
  }, []);
  useEffect(() => {
    if (!player) return;
    apiRef.current = player;
    player.playVideo();
  }, [apiRef, player]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0 as 0
    }
  };

  return <YouTube opts={opts} onReady={playerOnReady} {...props} />;
}
