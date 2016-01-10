# dotsound
Simple web application that reads, lists and plays mp3 songs. Powered by [Flask](http://flask.pocoo.org/)

##Instalaltion

Install dependeties:
```
python setup.py install
```
>**Note:** It is always recommended to use *virtualenv* for a development setup. 
For more information: [Flask with virtualenv](http://flask.pocoo.org/docs/0.10/installation/)

##Usage
Running the script is all that is required. app will default to *localhost:5000*.

```
python run.py
```
### Run globally
For global access pass host and port argument in *setup.py*. [Read more here](http://flask.pocoo.org/docs/0.10/api/#application-globals)

```
from dotsound import app
if __name__ == '__main__':
    app.run('0.0.0.0', port=80)
```

then run with root priviledge or as superuser


