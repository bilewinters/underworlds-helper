#!/bin/bash

# iPhone 11 Pro Max
ffmpeg -i input.mp4 -filter:v "crop=499:1080:712:0" -c:a copy output.mp4
ffmpeg -i input.mp4 -acodec copy -crf 12 -vf scale=886:1920,setsar=1:1 output.mp4

# iPhone 8 Plus
ffmpeg -i input.mp4 -filter:v "crop=609:1080:656:0" -c:a copy output.mp4
ffmpeg -i input.mp4 -acodec copy -crf 12 -vf scale=1080:1920,setsar=1:1 output.mp4

# iPad Pro 4th Gen (12.9 inch)
ffmpeg -i input.mp4 -filter:v "crop=813:1080:554:0" -c:a copy output.mp4
ffmpeg -i input.mp4 -acodec copy -crf 12 -vf scale=1200:1600,setsar=1:1 output.mp4