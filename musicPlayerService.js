import TrackPlayer, { AppKilledPlaybackBehavior, Event, RepeatMode } from 'react-native-track-player';

import { playListData } from './constants'


export async function setupPlayer() {

    let isSetup = false;
    try {
        await TrackPlayer.getActiveTrackIndex()
        isSetup = true;
        
        
    
    } catch (error) {
        await TrackPlayer.setupPlayer()
        // await TrackPlayer.updateOptions({
        //     android: {
        //       appKilledPlaybackBehavior:
        //       AppKilledPlaybackBehavior.ContinuePlayback,
        //     },
        //     capabilities: [
        //       Capability.Play,
        //       Capability.Pause,
        //       Capability.SkipToNext,
        //       Capability.SkipToPrevious,
        //       Capability.SeekTo,
        //     ],
        //     compactCapabilities: [
        //       Capability.Play,
        //       Capability.Pause,
        //       Capability.SkipToNext,
        //     ],
        //     progressUpdateEventInterval: 2,
        //   });
        isSetup = true;
     
    }
    finally {
        return isSetup;

    }

}

export async function addTrack() {
    await TrackPlayer.add(playListData)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export async function playBackService() {

    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    })

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext()
    })

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious()
    })





}