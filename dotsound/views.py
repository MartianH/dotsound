#!/usr/bin/python
# -*- coding: utf-8 -*-

from dotsound import app
from dotsound.tools import track_length, nr_format
from flask import render_template, jsonify
from mutagen.mp3 import MP3
from operator import itemgetter
import os
import sys

music_dir = "{0}/dotsound/static/music/".format(os.getcwd())

if not os.path.exists(music_dir): #You have to be root to do this
    os.makedirs(music_dir)

ls_dir = os.listdir(music_dir)
mp3_list = [files for files in ls_dir if files.endswith(".mp3")]
mp3_list.sort()
mp3_list_index = len(mp3_list)

artists = []

for files in mp3_list:
    mp3 = MP3(music_dir+files)
    T = ''
    if 'TPE1' in mp3:
        artist = u' '.join(mp3['TPE1'].text)
        TPE = artist
        if TPE not in artists:
            artists.append(TPE)

artists.sort()
artist_index = len(artists)


@app.errorhandler(404)
def not_found(e):
    return render_template("HTTP_error.html", title="Not Found",
                           err_title='Not found... (404)',
                           err_desc="The page you are looking for doesn't exist or has been removed.",
                           err_misc=''), 404


@app.errorhandler(500)
def internal_error(e):
    return render_template("HTTP_error.html", title="Internal Error",
                           err_title='The server f*cked up... (500)',
                           err_desc="There is an internal error on the server. Please check back later.",
                           err_misc='In the mean time:</em> <a href="http://www.omfgdogs.com/">Look! Dogs!'), 500


@app.errorhandler(503)
def temp_unavailable(e):
    return render_template("HTTP_error.html", title="Not Found",
                           err_title='Well, this is awkward... (503',
                           err_desc="The page you are trying to reach is temporarly unavilable.",
                           err_misc="Reload the page or try back later!"), 503


@app.route('/')
def index():
    songs = {
        'track': [],
        'title': [],
        'artist': [],
        'album': [],
        'length': [],
        'url': []
    }

    songs_tuple = []

    for files in mp3_list:
        mp3 = MP3(music_dir+files)

        if 'TALB' in mp3:
            track = u' '.join(mp3['TRCK'].text).encode('utf-8')
            title = u' '.join(mp3['TIT2'].text).encode('utf-8')
            artist = u' '.join(mp3['TPE1'].text).encode('utf-8')
            album = u' '.join(mp3['TALB'].text).encode('utf-8')
            length = track_length(mp3.info.length)
            url = 'static/music/'+files

            songs['track'].append(nr_format(track))
            songs['title'].append(title)
            songs['artist'].append(artist)
            songs['album'].append(album)
            songs['length'].append(length)
            songs['url'].append(url)
            songs_tuple.append((nr_format(track),
                                title,
                                artist,
                                album,
                                length,
                                url))

    songs_tuple.sort(key=itemgetter(2, 3, 0))

    return render_template('main.html', songs=songs_tuple,
                           title='player', s=len(songs_tuple))


@app.route('/stream')
def stream():
    return render_template("stream.html", title="stream",
                           MP3=MP3, music_dir=music_dir,
                           artists=artists, artist_index=artist_index,
                           )


@app.route('/stream/<artist>')
def artist(artist):
    return render_template("artist.html", title=artist,
                           artist=artist, MP3=MP3,
                           music_dir=music_dir, mp3_list=mp3_list,
                           mp3_list_index=mp3_list_index,
                           )


@app.context_processor
def u_processor():
    def track_length(float):
        time = int(float)
        minutes = time / 60
        seconds = time % 60
        length = "{0:02d}:{1:02d}".format(int(minutes), seconds)
        return length
    return dict(track_length=track_length)

