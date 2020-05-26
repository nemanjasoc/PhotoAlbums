export interface Album {
    userId: number;
    id: number;
    title: string;
    userName: string;
}

export interface User {
    id: number;
    name: number;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    thumbnailUrl: string;
}
