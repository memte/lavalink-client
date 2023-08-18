import { Player } from "./Player";
import { Base64 } from "./Utils";

type LavalinkSourceNames = "youtube" | "youtubemusic" | "soundcloud" | "bandcamp" | "twitch";

type LavalinkPlugin_LavaSrc_SourceNames = "deezer" |  "spotify" | "applemusic" | "yandexmusic" | "flowery-tts";
type SourceNames = LavalinkSourceNames | LavalinkPlugin_LavaSrc_SourceNames;

export interface LavalinkTrackInfo {
    identifier: string;
    title: string;
    author: string;
    length: number;
    artworkUrl: string | null;
    uri: string;
    sourceName: SourceNames;
    isSeekable: boolean;
    isStream: boolean;
    isrc: string | null;
}

export interface TrackInfo {
    identifier: string;
    title: string;
    author: string;
    duration: number;
    artworkUrl: string | null;
    uri: string;
    sourceName: SourceNames;
    isSeekable: boolean;
    isStream: boolean;
    isrc: string | null;
}



export interface PluginInfo {
    /** The Type provided by a plugin */
    type?: "album" | "playlist" | "artist" | "recommendations" | string;
    /** The Identifier provided by a plugin */
    albumName?: string;
    /** The url of the album art */
    albumArtUrl?: string;
    /** The url of the artist */
    artistUrl?: string;
    /** The url of the artist artwork */
    artistArtworkUrl?: string;
    /** The url of the preview */
    previewUrl?: string;
    /** Whether the track is a preview */
    isPreview?: boolean;
    /** The total number of tracks in the playlist */
    totalTracks?: number;
    /** The Identifier provided by a plugin */
    identifier?: string;
    /** The ArtworkUrl provided by a plugin */
    artworkUrl?: string;
    /** The Author Information provided by a plugin */
    author?: string;
    /** The Url provided by a Plugin */
    url?: string,
    /** The Url provided by a Plugin */
    uri?: string,
    /** You can put specific track information here, to transform the tracks... */
    clientData?: { [key:string] : any },
}

export interface LavalinkTrack {
    /** The Base 64 encoded String */
    encoded?: Base64;
    /** Track Information */
    info: LavalinkTrackInfo;
    /** Plugin Information from Lavalink */
    pluginInfo: Partial<PluginInfo>;
}

export interface Track {
    /** The Base 64 encoded String */
    encoded?: Base64;
    /** Track Information */
    info: TrackInfo;
    /** Plugin Information from Lavalink */
    pluginInfo: Partial<PluginInfo>;
    /** The Track's Requester */
    requester?: unknown;
}


export interface UnresolvedTrackInfo extends Partial<TrackInfo> {
    /** Required */
    title: string;
}
export interface UnresolvedQuery extends UnresolvedTrackInfo {
    /** The base64 of the unresolved track to "encode" */
    encoded?: Base64;
}
export interface UnresolvedTrack {
    /** Required */
    resolve: (player:Player) => Promise<void>;
    /** The Base 64 encoded String */
    encoded?: Base64;
    /** Track Information */
    info: UnresolvedTrackInfo;
    /** The Track's Requester */
    requester?: unknown;
}