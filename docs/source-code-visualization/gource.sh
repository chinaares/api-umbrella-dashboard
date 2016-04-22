gource \
  -1280x720 \
  --seconds-per-day 1 \
  --title "Apinf project development activity" \
  --user-image-dir .git/avatar/ \
  --key \
  --logo public/favicon.png \
  --caption-file "gource-annotations.txt" \
  --caption-duration 3 \
  -o - | ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i - -vcodec libx264 -preset ultrafast -pix_fmt yuv420p -crf 1 -threads 0 -bf 0 gource.mp4
