#!/bin/bash
ffmpeg -i input.mp4 -acodec copy -crf 12 -vf scale=1080:1920,setsar=1:1 output.mp4