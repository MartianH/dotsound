# dotsound
Simple application that reads, lists and plays mp3 songs by reading the ID3 tags of each file. The application is build with [Flask](http://flask.pocoo.org/) and enabled client side with javascript (jquery).

See also: [Mutagen](https://mutagen.readthedocs.org/en/latest/)

##Instalaltion
make music directory inside '/static' the name of the folder has to be 'music'
```sh
mkdir dotsound/static/music
```
Install dependeties:
```sh
python setup.py install
```
>**Note:** It is always recommended to use *virtualenv* for a development setup. 
For more information: [Flask with virtualenv](http://flask.pocoo.org/docs/0.10/installation/)

##Usage
Running the script is all that is required. app will default to *localhost:5000*.

```sh
python run.py
```
### Run globally
For global access pass host and port argument in *setup.py*. [Read more here](http://flask.pocoo.org/docs/0.10/api/#application-globals)

```python
    from dotsound import app
        if __name__ == '__main__':
        app.run('0.0.0.0', port=80)
```

then run with root priviledge or as superuser


