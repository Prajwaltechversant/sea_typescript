import {Track} from 'react-native-track-player';

const albumCoverUrls = [
    "https://placekitten.com/300/300",
    "https://picsum.photos/300/300?random=1",
    "https://loremflickr.com/300/300/music",
    "https://placebear.com/300/300",
    "https://picsum.photos/300/300?random=2",
    "https://loremflickr.com/300/300/album",
    "https://placekitten.com/301/301",
    "https://picsum.photos/301/301?random=3",
    "https://loremflickr.com/301/301/music"
];


export const playListData:Track[] = [

    {
        id:1,
        title:'sample 1',
        artist:'john',
        album:'abc',
        artwork:'https://th.bing.com/th/id/OIP.7Za5U74jDu65-d4dcGu4QQHaGl?rs=1&pid=ImgDetMain',
        url:require('../sea/src/assets/songs/one.mp3')

    },
    {
        id:2,
        title:'sample 2',
        artist:'neel',
        album:'abc',
        artwork:'https://media.altpress.com/uploads/2019/05/3oh3.jpg',
        url:require('../sea/src/assets/songs/two.mp3'),


    },
    {
        id:3,
        title:'sample 3',
        artist:'neel',
        album:'abdfc',
        artwork:'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5acccc80032425.5cd5037ad1006.jpg',
        url:require('../sea/src/assets/songs/3.mp3'),


    },
    {
        id:4,
        title:'sample 3',
        artist:'neel',
        album:'abdfc',
        artwork:'https://mir-s3-cdn-cf.behance.net/projects/max_808/42380b110225273.Y3JvcCwzOTk1LDMxMjUsODksMA.jpg',
        url:require('../sea/src/assets/songs/4.mp3'),


    },
    {
        id:5,
        title:'sample 3',
        artist:'neel',
        album:'abdfc',
        artwork:'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f7151d133379113.61bbf2b37a2ec.jpg',
        url:require('../sea/src/assets/songs/5.mp3'),


    },
    {
        id:6,
        title:'sample 3',
        artist:'neel',
        album:'abdfc',
        artwork:'https://img.freepik.com/free-vector/organic-flat-abstract-music-youtube-thumbnail_23-2148925028.jpg',
        url:require('../sea/src/assets/songs/6.mp3'),


    },
    {
        id:7,
        title:'sample 3',
        artist:'neel',
        album:'abdfc',
        artwork:'https://th.bing.com/th/id/OIP.yIX2mrG7D7FUMf0h4nN_2AAAAA?rs=1&pid=ImgDetMain',
        url:require('../sea/src/assets/songs/7.mp3'),
    },

]