#!/usr/bin/env bash
# Usage: scripts/optimize-media.sh <raw-folder>
# Name raw files: hero.mov, reel-1..4.mov, mikia-portrait.jpg, band.jpg, gallery-1..8.jpg
# Outputs web-ready files into public/media.
set -euo pipefail
SRC="${1:?raw folder}"
OUT="$(dirname "$0")/../public/media"
mkdir -p "$OUT"

shopt -s nullglob
for f in "$SRC"/hero.*; do
  case "$f" in *.jpg|*.jpeg|*.png|*.webp) continue;; esac
  ffmpeg -y -i "$f" -t 10 -an -vf "scale=-2:1080,fps=30" -c:v libx264 -crf 28 -preset veryfast -movflags +faststart -pix_fmt yuv420p "$OUT/hero.mp4"
  ffmpeg -y -ss 1 -i "$OUT/hero.mp4" -frames:v 1 -q:v 4 "$OUT/hero.jpg"
done
for n in 1 2 3 4; do
  for f in "$SRC"/reel-$n.*; do
    case "$f" in *.jpg|*.jpeg|*.png|*.webp) continue;; esac
    ffmpeg -y -i "$f" -t 15 -an -vf "scale=720:-2,fps=30" -c:v libx264 -crf 29 -preset veryfast -movflags +faststart -pix_fmt yuv420p "$OUT/reel-$n.mp4"
    ffmpeg -y -ss 1 -i "$OUT/reel-$n.mp4" -frames:v 1 -q:v 4 "$OUT/reel-$n.jpg"
  done
done
for f in "$SRC"/mikia-portrait.* "$SRC"/band.* "$SRC"/gallery-*.*; do
  case "$f" in *.jpg|*.jpeg|*.png|*.webp|*.heic) ;; *) continue;; esac
  b="$(basename "${f%.*}")"
  ffmpeg -y -i "$f" -vf "scale='min(2000,iw)':-2" -q:v 4 "$OUT/$b.jpg"
done
du -sh "$OUT"
